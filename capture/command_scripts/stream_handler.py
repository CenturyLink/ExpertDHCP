import subprocess
import shlex
import re
import json


class StreamHandler(object):
    """
        A singleton class to handle the stream of dump and
        return stdout in generator fashion
    """
    __instance = None

    def __init__(self,
                 dhcp_dump_command="sudo {} -i {}",
                 dump_path='/usr/bin/dhcpdump_json',
                 dump_if='eno1',
                 msg_sep_regex=r'(-{5,})'):

        self.dhcp_dump_command = dhcp_dump_command.format(dump_path, dump_if)
        self.message_seperator_pattern = re.compile(msg_sep_regex)
        self.last_field = None

        if StreamHandler.__instance is not None:
            print("Instance already exists for singleton class StreamHandler")
            raise Exception("This class is a singleton!")
        else:
            print("Created instance of class StreamHandler")
            StreamHandler.__instance = self

    def generate_dump(self):
        try:
            print(shlex.split(self.dhcp_dump_command))

            dhcp_dump_stream_process = subprocess.Popen(shlex.split(self.dhcp_dump_command),
                                                        stdout=subprocess.PIPE,
                                                        stderr=subprocess.PIPE)
            # print("Killable PID dhcpdump",dhcp_dump_stream_process.pid)
            for msg in dhcp_dump_stream_process.stdout:
                print('-' * 100)
                print(msg)
                print('-' * 100)
                yield json.loads(msg)

        except Exception as excp:
            import sys, os
            print("some exception occured in stream handler")
            print(excp)
            exc_type, exc_obj, exc_tb = sys.exc_info()
            print('%s, %s, %s', exc_type, exc_obj, exc_tb)
            fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
            print('%s, %s, %s', str(exc_type), str(fname),
                  str(exc_tb.tb_lineno))
