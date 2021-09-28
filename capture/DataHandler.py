import re
import pandas as pd
import OptionHandler
from collections import defaultdict
from queue import PriorityQueue

factory = OptionHandler.ObjectFactory()
factory.register_builder('DHCPACK', OptionHandler.dhcpAckBuilder())
factory.register_builder('DHCPNAK', OptionHandler.dhcpNackBuilder())
factory.register_builder('DHCPDISCOVER', OptionHandler.dhcpDiscoverBuilder())
factory.register_builder('DHCPREQUEST', OptionHandler.dhcpRequestBuilder())
factory.register_builder('DHCPOFFER', OptionHandler.dhcpOfferBuilder())

log_queue = PriorityQueue()

pd.set_option('display.max_columns', None)
pd.set_option('display.width', None)


class DataHandler(object):
    def __init__(self, stream_object, myfilter=None):
        print('hi')
        self.stream_object = stream_object
        self.filter = myfilter
        self.packet_count = 0
        self.packet_drop_count = 0

    def create_dataframe(self):
        dataset = None
        print('creating')
        for message in self.stream_object.generate_dump():
            message_type, options = self.process_message_options(message['OPTION'])
            options_object = factory.create(message_type, options)
            message['OPTION'] = repr(options_object)
            message['LOGS'] = self.get_corresponding_logs(message['TIME'])
            dataset = self.apply_filter(message, dataset)

    @staticmethod
    def process_message_options(message):

        processed_message = defaultdict()
        pat_val = re.compile(r'\d+\s+\((\w+)\)')
        pat_key = re.compile(r'(\d+)\.\s*(\d+)\.\s*((\w+[\s\-])+)\s?')
        msg_type = ""
        for key, val in message.items():
            match = pat_key.search(key)
            field = match.group(3).rstrip()
            if match and field == "DHCP message type":
                vmatch = pat_val.search(val)
                if vmatch:
                    msg_type = vmatch.group(1)
                processed_message[field] = msg_type
            else:
                processed_message[field] = val
        return msg_type, processed_message

    def apply_filter(self, message, dataset):
        try:
            if self.filter is not None:
                if message[self.filter[0]] == self.filter[1]:
                    dataset = self.insert_to_dataframe(message, dataset)
                    self.packet_count += 1
                else:
                    self.packet_drop_count += 1
            else:
                dataset = self.insert_to_dataframe(message, dataset)
                self.packet_count += 1
            return dataset
        except Exception as err:
            print("some exception occured in data handler")
            print(repr(err))

    def insert_to_dataframe(self, row, dataframe):
        try:
            # print('*'*100)
            print(pd.DataFrame([row]))
            if dataframe is None:
                dataframe = pd.DataFrame([row])
            else:
                dataframe = dataframe.append([row])
            # send("dataframe")
            self.save_as_csv(dataframe)
            return dataframe
        except Exception as e:
            print(repr(e))

    def save_as_csv(self, dataframe):
        dataframe.to_csv('dhcpdump.csv')

    def print_tail(self):
        for msg in self.stream_object.generate_dump():
            log_queue.put(msg.decode('utf-8'))
            # print(msg)

    def get_corresponding_logs(self, time):
        pattern = r'\d{4}-\d{2}-\d{2}\s+(\d+\:\d+\:\d+\.\d+)\s+.*'
        pat = re.compile(pattern)
        time_to_compare = time.split(" ")[1]
        temp = log_queue.get()
        logs = ""
        # if time_to_compare>str(pat.match(temp).group(1)):
        while time_to_compare>=str(pat.match(temp).group(1)):
            # print(time_to_compare>=str(pat.match(temp).group(1)))
            logs += temp
            temp = log_queue.get()
            # print(temp)
        log_queue.put(temp)
        return logs
