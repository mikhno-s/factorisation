import socket
import re

sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
sock.bind(('0.0.0.0', 8125))

def format(s):
    p = re.compile(r"app=(?P<app>.*)\.metric=(?P<metric>.*)?:(?P<data>\d*)\|(?P<metric_type>.*)")
    result = ''
    for k in re.finditer(p, s):
        result = result+"node_node1.app_"+k['app']+".metric_"+k['metric']+"."+k['data']+"|"+k['metric_type']+"\n"
    return result

while True:
    data, addr = sock.recvfrom(512)
    print(format(data.decode('ascii')))
