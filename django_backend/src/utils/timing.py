import time
from functools import wraps
from typing import Any, Tuple, Callable

def timeit(func: Callable) -> Callable[..., Tuple[Any, float]]:
    """
    Decorator that measures execution time of `func`.
    Returns a tuple: (original_return_value, elapsed_seconds).
    """
    @wraps(func)
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        elapsed = time.time() - start
        return result, elapsed
    return wrapper
