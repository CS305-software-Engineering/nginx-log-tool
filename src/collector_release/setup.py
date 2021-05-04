from setuptools import setup,find_packages
import sys
sys.path.insert(0,'./')
setup(
  name='collector',
  version='0.1',
  description='logging tool for nginx server',
  author='mp',
  author_email='hello@micropyramid.com',
  license='MIT',
  packages=find_packages(),
  entry_points = {
    'console_scripts': ['collector=collector.command_line:run'],
    },
  zip_safe=False)
