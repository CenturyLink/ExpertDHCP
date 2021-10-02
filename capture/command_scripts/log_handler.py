import subprocess
import shlex


class LogHandler(object):
    """
        A class to handle the stream of dump and
        return stdout in generator fashion
    """
    __instance = None

    def __init__(self, tail_log_command="tail -f -n 2 {}", logfile='/usr/local/var/log/kea-dhcp4.log'):
        self.tail_log_command = tail_log_command.format(logfile)
        self.last_field = None

    def generate_dump(self):
        try:
            print(shlex.split(self.tail_log_command))
            dhcp_dump_stream_process = subprocess.Popen(shlex.split(self.tail_log_command),
                                                        stdout=subprocess.PIPE,
                                                        stderr=subprocess.PIPE)
            # print("Killable PID log tail",dhcp_dump_stream_process.pid)
            for msg in dhcp_dump_stream_process.stdout:
                # print('+'*100)
                # print(msg)
                # print('+'*100)
                yield msg

        except Exception as err:
            print("some exception occured in Log handler")
            print(err)
