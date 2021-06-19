import time

from django.db import connections
from django.db.utils import OperationalError
from django.core.management.base import BaseCommand


class Command(BaseCommand):
    """waits until database is live to continue execution"""

    def handle(self, *args, **options):
        self.stdout.write('Database is being loaded...')
        con = None

        while not con:
            try:
                con = connections['default']
            except OperationalError:
                self.stdout.write('Failed to connect. Retrying...')
                time.sleep(1)
        
        self.stdout.write(self.style.SUCCESS('Database service is live and connected!'))
