from django.db import models


# Email subscriber
class Subscriber(models.Model):
    email = models.CharField(max_length=64, blank=True, null=True)
    ref = models.CharField(max_length=64, blank=True, default="", null=True)        

    def __str__(self):
        if not self.ref:
            return self.email
        else:
            return self.ref + " | " + self.email

