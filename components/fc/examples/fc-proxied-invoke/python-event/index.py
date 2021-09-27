# -*- coding: utf-8 -*-
import logging

# if you open the initializer feature, please implement the initializer function, as below:
# def initializer(context):
#   logger = logging.getLogger()
#   logger.info('initializing')

def handler(event, context):
  logger = logging.getLogger()
  logger.info('hello world11111')
  logger.info('hello world2222')
  return 'hello world'
