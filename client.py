import socket
UDP_IP = "127.0.0.1"
UDP_PORT = 8125


sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)

msg = ""
for i in range(1,100):
    msg = msg + "app=app"+str(i)+".metric=metric"+str(i)+":1|c\n"


print("send - " + msg)
sock.sendto(msg.encode('ascii'), (UDP_IP, UDP_PORT))
    