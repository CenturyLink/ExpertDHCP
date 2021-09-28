import subprocess
import shlex
import re
import json, threading
from queue import  PriorityQueue

log_queue = PriorityQueue()


class StreamHandler(object):
    """
        A singleton class to handle the stream of dump and
        return stdout in generator fashion
    """
    __instance = None

    def __init__(self,
                 ssh_connection=None,
                 dhcp_dump_command="/usr/bin/dhcpdump_json -i eno1",
                 msg_sep_regex=r'(-{5,})',
                 tail_log_command="tail -f /usr/local/var/log/kea_server-dhcp4.log"):
        self.tail_log_command = tail_log_command
        self.dhcp_dump_command = dhcp_dump_command
        self.message_seperator_pattern = re.compile(msg_sep_regex)

        if StreamHandler.__instance is not None:
            print("Instance already exists for singleton class StreamHandler")
            raise Exception("This class is a singleton!")
        else:
            print("Created instance of class StreamHandler")
            StreamHandler.__instance = self

    def generate_log_dump(self):
        try:
            global log_queue
            print(shlex.split(self.tail_log_command))
            log_dump_process = subprocess.Popen(shlex.split(self.tail_log_command),
                                                        stdout=subprocess.PIPE,
                                                        stderr=subprocess.PIPE)
            for msg in log_dump_process.stdout:
                log_queue.put(msg.decode('utf-8'))
                # print(msg)
                # yield msg

        except Exception as err:
            print("some exception occured in stream handler log dump")
            print(err)

    def generate_dump(self):
        try:
            log_thread = threading.Thread(target=self.generate_log_dump)
            log_thread.start()
            print(shlex.split(self.dhcp_dump_command))
            dhcp_dump_stream_process = subprocess.Popen(shlex.split(self.dhcp_dump_command),
                                                        stdout=subprocess.PIPE,
                                                        stderr=subprocess.PIPE)
            for msg in dhcp_dump_stream_process.stdout:
                msg = json.loads(msg)
                msg['LOGS'] = self.get_corresponding_logs(msg['TIME'])
                yield msg

        except Exception as err:
            print("some exception occured in stream handler dump")
            print(err)

    def get_corresponding_logs(self, timestr):
        global log_queue

        pattern = r'\d{4}-\d{2}-\d{2}\s+(\d+\:\d+\:\d+\.\d+)\s+.*'
        pat = re.compile(pattern)
        time_to_compare = timestr.split(" ")[1]
        temp = log_queue.get()
        logs = ""
        # if time_to_compare>str(pat.match(temp).group(1)):
        while time_to_compare >= str(pat.match(temp).group(1)):
            # print(time_to_compare>=str(pat.match(temp).group(1)))
            logs += temp
            temp = log_queue.get()
            # print(temp)
        log_queue.put(temp)
        return logs[ayush@dev-dhcp-server ~]$ 

