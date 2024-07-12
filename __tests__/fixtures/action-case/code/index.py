# -*- coding: utf-8 -*-

import logging
import time

def handler(event, context):
    logger = logging.getLogger()
    logger.info(event)
    time.sleep(60)
    logger.info("xxxxxxxx")
    return event
