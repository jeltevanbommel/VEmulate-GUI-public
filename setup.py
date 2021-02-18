from setuptools import setup, find_packages

setup(
    name='vemulatorgui',
    version='1.0',
    author='Wilco van Beijnum, Jelte van Bommel, Matteo Bronkhorst',
    install_requires=['Flask', 'eventlet', 'Flask-SocketIO', 'flask-cors', 'vemulator'],
    packages=find_packages(),
    entry_points='''
       [console_scripts]
       vemulator-gui=ws:gui
   '''
)