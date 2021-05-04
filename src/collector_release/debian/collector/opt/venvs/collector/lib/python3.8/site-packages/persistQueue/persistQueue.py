#!/usr/bin/env python
# coding: utf-8

import logging
from persistqueue import SQLiteAckQueue


class PersistQueue(object):

    def __init__(self, path_file, maxsize=500, logger_name=None):
        self.q = None
        self.maxsize = maxsize
        self.logger = logging.getLogger(logger_name)
        # --------------------------------------------------------------------------
        # Instance to create a Queue
        # --------------------------------------------------------------------------
        try:
            self.q = SQLiteAckQueue(path_file, multithreading=True)
        except Exception as e:
            self.logger.info("Exception in SQLite Queue: %s" % e)

    def is_empty(self):
        # --------------------------------------------------------------------------
        # Method to verify if the queue in the file is empty
        # Return TRUE if is empty or FALSE if not.
        # --------------------------------------------------------------------------
        if self.q.qsize() < 1:
            return True
        else:
            return False

    def ack(self, data):
        # --------------------------------------------------------------------------
        # If done with the item
        # --------------------------------------------------------------------------
        self.q.ack(data)

    def no_ack(self, data):
        # --------------------------------------------------------------------------
        # Else mark item as `nack` so that it can be proceeded again by any worker
        # --------------------------------------------------------------------------
        self.q.nack(data)

    def discard(self, data):
        # --------------------------------------------------------------------------
        # Or else mark item as `ack_failed` to discard this item
        # --------------------------------------------------------------------------
        self.q.ack_failed(data)

    def put_queue(self, data):
        # --------------------------------------------------------------------------
        # Method to insert new data in the queue and store in the file
        # --------------------------------------------------------------------------

        # Verify if the queue has reached its limit, according to the limit set on
        # config file. If the queue reach out the limit, the method delete the oldest
        # data stored and insert the new data on the top of the queue.
        if self.q.qsize() <= self.maxsize:
            self.logger.info('qsize %d' % self.q.qsize())
            if self.q.qsize() == self.maxsize:
                old_data = self.get_queue()
                self.ack(old_data)
                self.logger.info('data deleted %s with qsize %d' % (str(old_data), self.q.qsize()))
            self.q.put(data)

    def get_queue(self):
        # --------------------------------------------------------------------------
        # Method to get data stored in the queue
        # --------------------------------------------------------------------------
        # If queue isn't empty
        if self.is_empty() is not True:
            return self.q.get(False, 2)
        else:
            return None
