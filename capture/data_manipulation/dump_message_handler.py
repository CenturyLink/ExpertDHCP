import re
import os
import pandas as pd
from dhcp_monitor.data_manipulation import message_option_handler
from collections import defaultdict
from queue import PriorityQueue
from utils import check_path, MONITOR_LOGGER
from config import SYSTEM_IP

# Create message_option_handler factory and register builders
factory = message_option_handler.ObjectFactory()
factory.register_builder('DHCPACK', message_option_handler.DhcpAckBuilder())
factory.register_builder('DHCPNAK', message_option_handler.DhcpNackBuilder())
factory.register_builder('DHCPDISCOVER', 
    message_option_handler.DhcpDiscoverBuilder())
factory.register_builder('DHCPREQUEST', 
    message_option_handler.DhcpRequestBuilder())
factory.register_builder('DHCPOFFER', message_option_handler.DhcpOfferBuilder())

# Setup log and message queues
log_queue = PriorityQueue()
msg_queue = PriorityQueue()
incoming_msg_queue = PriorityQueue()
outgoing_msg_queue = PriorityQueue()

# Set PANDAS width and max columns
pd.set_option('display.max_columns', None)
pd.set_option('display.width', None)

class DataHandler(object):
    def __init__(self, stream_object, myfilter=None, csv_filename='/dhcp_packets.csv'):
        # self.filename = 'dhcpdump.csv'
        self.filename = os.path.dirname(os.path.dirname(os.path.abspath(__file__))) + csv_filename
        self.reset_dump_collection_file()
        self.stream_object = stream_object
        self.filter = myfilter
        self.packet_count = 0
        self.packet_drop_count = 0
        self.dataframe = None

    def reset_dump_collection_file(self):
        if os.path.exists(self.filename):
            os.remove(self.filename)
        with open(self.filename, 'w') as file:
            pass

    def create_dataframe(self):
        if os.stat(self.filename).st_size / (1024 * 1024) < 200:
            for message in self.stream_object.generate_dump():
                print('hi1')
                print('%' * 100)
                print(message['OPTION'])
                print('%' * 100)
                print('*' * 100)
                print(message)
                print('*' * 100)

                # message_type, options = self.process_message_options(message['OPTION'])
                message_type, options = DataHandler.process_message_options(message['OPTION'])
                print('@'*100)
                print(message_type, options)
                print('@'*100)
                print('hi')
                options_object = factory.create(message_type, options)
                message['OPTION'] = repr(options_object)
                msg_queue.put(message)
                print('here1')
                # DUMP_LOGGER.info(msg_queue)
                # start = time.time()
                # message['LOGS'] = self.get_corresponding_logs(message['TIME'])
                # end = time.time()
                # DUMP_LOGGER.info("Total time taken: {}".format(end-start))
                self.apply_filter(message)
                del options_object
        else:
            MONITOR_LOGGER.info('CSV Full')
            return 0

    @staticmethod
    def process_message_options(message):
        print('here')
        processed_message = defaultdict()
        pat_val = re.compile(r'\d+\s+\((\w+)\)')
        pat_key = re.compile(r'(\d+)\.\s*(\d+)\.\s*((\w+[\s\-\/])+)\s?')
        msg_type = ""
        for key, val in message.items():
            print('k = {} \n v: {}'.format(key,val))
            match = pat_key.search(key)
            field = match.group(3).rstrip()
            print('match =', match)
            if match and field == "DHCP message type":
                vmatch = pat_val.search(val)
                if vmatch:
                    msg_type = vmatch.group(1)
                processed_message[field] = msg_type
            else:
                processed_message[field] = val
            print('.'*100)
            print(processed_message)
            print('.'*100)
        return msg_type, processed_message

    def apply_filter(self, message):
        try:
            if self.packet_count % 10 == 0 and self.packet_count > 0:
                print('{} packets captured'.format(str(self.packet_count)))
                MONITOR_LOGGER.info('{} packets captured'.format(str(self.packet_count)))
            if self.filter is not None:
                if message[self.filter[0]] == self.filter[1]:
                    self.insert_to_dataframe(message)
                    self.packet_count += 1
                    # MONITOR_LOGGER.info("Packet Count -> %d", self.packet_count)
                else:
                    self.packet_drop_count += 1
            else:
                # message = self.get_new_corresponding_logs()
                # self.insert_to_dataframe(message)
                print('here2')

                self.insert_to_dataframe(self.get_new_corresponding_logs())
                self.packet_count += 1
                # MONITOR_LOGGER.info("Packet Count -> %d", self.packet_count)
        except Exception as err:
            MONITOR_LOGGER.info("some exception occured in data handler")
            MONITOR_LOGGER.info(repr(err))

    def insert_to_dataframe(self, row):
        try:
            # DUMP_LOGGER.info('*'*100)
            # DUMP_LOGGER.info(pd.DataFrame([row]))
            # MONITOR_LOGGER.info('inserting to df')
            if self.dataframe is None:
                self.dataframe = pd.DataFrame([row])
                save_header = True
            else:
                self.dataframe = self.dataframe.append([row])
                save_header = False

            self.save_as_csv(pd.DataFrame([row]), save_header=save_header)
        except Exception as e:
            MONITOR_LOGGER.info(repr(e))

    def save_as_csv(self, data_row, save_header):
        if save_header:
            MONITOR_LOGGER.info('saving to %s', self.filename)
        data_row.to_csv(self.filename, mode='a', header=save_header, index=False)

    def print_tail(self):
        print('log started')
        for msg in self.stream_object.generate_dump():

            print(msg.decode('utf-8'))
            log_queue.put(msg.decode('utf-8'))
            # DUMP_LOGGER.info('-----', msg)

    @staticmethod
    def get_corresponding_logs(time):
        pattern = r'\d{4}-\d{2}-\d{2}\s+(\d+\:\d+\:\d+\.\d+)\s+.*'
        pat = re.compile(pattern)
        time_to_compare = time.split(" ")[1]
        temp = log_queue.get()
        logs = ""
        # if time_to_compare>str(pat.match(temp).group(1)):
        while time_to_compare >= str(pat.match(temp).group(1)):
            # DUMP_LOGGER.info(time_to_compare>=str(pat.match(temp).group(1)))
            logs += temp
            temp = log_queue.get()
            # DUMP_LOGGER.info(temp)
        log_queue.put(temp)
        return logs

    @staticmethod
    def get_new_corresponding_logs():
        print('get_new_corresponding_logs')
        # global log_queue

        # global msg_queue

        pattern = r'\d{4}-\d{2}-\d{2}\s+(\d+\:\d+\:\d+\.\d+)\s+.*'

        pat = re.compile(pattern)

        logs = ""

        message = msg_queue.get()

        print(message.get('IP'))

        ip = message.get('IP').split('>')

        if SYSTEM_IP in ip[0].strip():

            print("Outgoing")

            # incoming msgs coming one after the other

            if not incoming_msg_queue.empty():

                print("incoming_msg_queue not empty in outgoing")

                last_incoming_message = incoming_msg_queue.get()

                time_to_compare = message['TIME'].split(" ")[1]

                temp = log_queue.get()

                logs = ""

                while time_to_compare > str(pat.match(temp).group(1)):
                    logs += temp

                    temp = log_queue.get()

                log_queue.put(temp)

                outgoing_msg_queue.put(message)

                last_incoming_message['LOGS'] = logs

                return last_incoming_message

            # else:

            time_to_compare = message['TIME'].split(" ")[1]

            temp = log_queue.get()

            logs = ""

            while time_to_compare >= str(pat.match(temp).group(1)):
                logs += temp

                temp = log_queue.get()

            log_queue.put(temp)

            outgoing_msg_queue.put(message)



        else:

            print("Incoming")

            if not outgoing_msg_queue.empty():

                print("outgoing queue is not emppty")

                last_outgoing_message = outgoing_msg_queue.get()

                time_to_compare = last_outgoing_message['TIME'].split(" ")[1]

                print(time_to_compare)

                temp = log_queue.get()

                print(temp)

                logs = ""

                while time_to_compare >= str(pat.match(temp).group(1)):
                    logs += temp

                    temp = log_queue.get()

                print("yaha par log = ", logs)

                log_queue.put(temp)

                incoming_msg_queue.put(message)

                last_outgoing_message['LOGS'] = logs

                print("returning this -->", last_outgoing_message)

                return last_outgoing_message

            if not incoming_msg_queue.empty():

                print("previous msg was incoming")

                last_incoming_message = incoming_msg_queue.get()

                time_to_compare = message['TIME'].split(" ")[1]

                temp = log_queue.get()

                # print(temp)

                # print("this should be greater",time_to_compare)

                # print("last iincoming message", last_incoming_message['TIME'])

                logs = ""

                while time_to_compare > str(pat.match(temp).group(1)):
                    logs += temp

                    temp = log_queue.get()

                log_queue.put(temp)

                print("logs = ", logs)

                # last_incoming_message['LOGS']= logs

                incoming_msg_queue.put(message)

                message = last_incoming_message
            else:
                incoming_msg_queue.put(message)
            message['LOGS'] = logs
            return message
        message['LOGS'] = logs
        return message

    # def get_new_corresponding_logs():
    #     # global log_queue
    #     # global msg_queue
    #     pattern = r'\d{4}-\d{2}-\d{2}\s+(\d+\:\d+\:\d+\.\d+)\s+.*'
    #     pat = re.compile(pattern)
    #     logs = ""
    #     message = msg_queue.get()
    #     DUMP_LOGGER.info(message.get('IP'))
    #     ip = message.get('IP').split('>')
    #     if systemIP in ip[0].strip():
    #         DUMP_LOGGER.info("Outgoing")
    #         # incoming msgs coming one after the other
    #         if not incoming_msg_queue.empty():
    #             last_incoming_message = incoming_msg_queue.get()
    #             time_to_compare = last_incoming_message['TIME'].split(" ")[1]
    #             temp = log_queue.get()
    #             logs = ""
    #             # if time_to_compare>=str(pat.match(temp).group(1)):
    #             while time_to_compare < str(pat.match(temp).group(1)):
    #                 # DUMP_LOGGER.info(time_to_compare>=str(pat.match(temp).group(1)))
    #                 # DUMP_LOGGER.info(str(pat.match(temp).group(1)))
    #                 logs += temp
    #                 temp = log_queue.get()
    #                 # DUMP_LOGGER.info(logs)
    #                 # DUMP_LOGGER.info(temp)
    #             log_queue.put(temp)
    #         incoming_msg_queue.put(message)
    #     else:
    #         DUMP_LOGGER.info("Incoming")

    #         if not incoming_msg_queue.empty():
    #             DUMP_LOGGER.info("previous msg was incoming")
    #             last_incoming_message = incoming_msg_queue.get()
    #             time_to_compare = message['TIME'].split(" ")[1]
    #             temp = log_queue.get()
    #             logs = ""
    #             # if time_to_compare>=str(pat.match(temp).group(1)):
    #             while time_to_compare > str(pat.match(temp).group(1)):
    #                 # DUMP_LOGGER.info(time_to_compare>=str(pat.match(temp).group(1)))
    #                 # DUMP_LOGGER.info(str(pat.match(temp).group(1)))
    #                 logs += temp
    #                 temp = log_queue.get()
    #                 # DUMP_LOGGER.info(logs)
    #                 # DUMP_LOGGER.info(temp)
    #             log_queue.put(temp)
    #             last_incoming_message['LOGS'] = logs
    #             return last_incoming_message
    #         else:
    #             # pattern = r'\d{4}-\d{2}-\d{2}\s+(\d+\:\d+\:\d+\.\d+)\s+.*'
    #             # pat = re.compile(pattern)
    #             time_to_compare = message['TIME'].split(" ")[1]
    #             # DUMP_LOGGER.info("time_to_compare", time_to_compare)
    #             # DUMP_LOGGER.info(log_queue.empty())
    #             temp = log_queue.get()
    #             # DUMP_LOGGER.info(">>>>>>",temp)
    #             logs = ""
    #             # if time_to_compare>=str(pat.match(temp).group(1)):
    #             while time_to_compare >= str(pat.match(temp).group(1)):
    #                 # DUMP_LOGGER.info(time_to_compare>=str(pat.match(temp).group(1)))
    #                 # DUMP_LOGGER.info(str(pat.match(temp).group(1)))
    #                 logs += temp
    #                 temp = log_queue.get()
    #                 # DUMP_LOGGER.info(logs)
    #                 # DUMP_LOGGER.info(temp)
    #             log_queue.put(temp)

    #     message['LOGS'] = logs
    #     return message

    # def get_rows(self, start, end):
    #     test_d = pd.read_csv('dhcpdump.csv')
    #     return test_d.iloc[start:end].to_json(orient='records')
    #     # return self.dataframe.iloc[start:end].to_json(orient='records')

    # def add_message_to_queue(self, message):
    #     global msg_queue
    #     msg_queue.put(message)

    def get_rows(self, start, end):
        if check_path(self.filename):
            df = pd.read_csv(self.filename)
            return df.iloc[start:end].to_json(orient='records')
        else:
            return 'File not found'

    def row_count(self):
        if check_path(self.filename):
            df = pd.read_csv(self.filename)
            return df.shape[0]
        else:
            return 'File not found'
