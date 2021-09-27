FROM python:3.9.0-slim

WORKDIR /usr/src/app
RUN pip install flask -i https://pypi.tuna.tsinghua.edu.cn/simple
COPY . .

CMD [ "python", "-u", "./app.py" ]
