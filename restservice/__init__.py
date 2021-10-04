from restservice.config import LOG_FILE_NAME


def create_dir(dir_path):
    """
    Creates a directory if it does not exist
    :param dir_path:
    :return: None
    """
    import os
    if not os.path.exists(dir_path):
        os.makedirs(dir_path)


def check_path(path):
    """
    Check if it is a valid path.
    :param path:
    :return: Boolean for existence of path.
    """
    import os
    return os.path.isfile(path)


def create_logger(logger_name, file_name):
    """
    :param logger_name:
    :param file_name:
    :return: logger with logger_name as specified and writes to file
    """
    import logging
    import os
    from logging.handlers import RotatingFileHandler
    from restservice.config import LOG_LEVEL, LOG_FILE_MAX_SIZE_MB, LOG_FILE_BACKUP_COUNT
    print("Defining logger [", logger_name, "] with Level [", LOG_LEVEL, "] and logger name [", LOG_FILE_NAME, "]")

    log_path = os.path.dirname(os.path.dirname(os.path.abspath(__file__))) + '/logs/'
    print("Log file path is ->", log_path + file_name)
    create_dir(log_path)
    logger = logging.getLogger(logger_name)
    logger.setLevel(LOG_LEVEL)

    formatter = logging.Formatter(
        "%(asctime)s [%(levelname)-8s] [%(filename)s:%(lineno)-4d] [%(funcName)s] %(message)s"
    )

    handler = RotatingFileHandler(log_path + file_name,
                                  maxBytes=LOG_FILE_MAX_SIZE_MB*1024*1024,
                                  backupCount=LOG_FILE_BACKUP_COUNT)

    handler.setLevel(LOG_LEVEL)
    handler.setFormatter(formatter)
    logger.addHandler(handler)
    print('Logger Created ->', str(logger))
    return logger


LOGGER = create_logger('EXPERT-DHCP-LOGGER', LOG_FILE_NAME)


def create_app():
    """
    :return: app object
    """
    from flask import Flask
    from flask_cors import CORS

    LOGGER.info("Creating App object")
    app = Flask(__name__, instance_relative_config=True)
    CORS(app)
    LOGGER.info("Added CORS to App")
    app.config.from_mapping(
        SECRET_KEY='dev'
    )
    LOGGER.info("Registering Blueprint to app")
    from restservice.endpoints import BP
    app.register_blueprint(BP)

    return app

