#!/usr/bin/env python3
"""Click the current mouse position multiple times on macOS."""

from __future__ import annotations

import argparse
import time

try:
    from Quartz import (
        CGEventCreate,
        CGEventCreateMouseEvent,
        CGEventGetLocation,
        CGEventPost,
        kCGEventLeftMouseDown,
        kCGEventLeftMouseUp,
        kCGHIDEventTap,
        kCGMouseButtonLeft,
    )
except ModuleNotFoundError as exc:
    raise SystemExit(
        "Missing dependency: Quartz. Install it with:\n"
        "  python3 -m pip install pyobjc-framework-Quartz"
    ) from exc


def click_once() -> None:
    current_event = CGEventCreate(None)
    point = CGEventGetLocation(current_event)

    down = CGEventCreateMouseEvent(None, kCGEventLeftMouseDown, point, kCGMouseButtonLeft)
    up = CGEventCreateMouseEvent(None, kCGEventLeftMouseUp, point, kCGMouseButtonLeft)

    CGEventPost(kCGHIDEventTap, down)
    CGEventPost(kCGHIDEventTap, up)


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Simulate left mouse clicks at the current cursor position on macOS."
    )
    parser.add_argument("-n", "--count", type=int, default=100, help="number of clicks")
    parser.add_argument(
        "-i", "--interval", type=float, default=0.01, help="seconds between clicks"
    )
    return parser.parse_args()


def main() -> None:
    args = parse_args()

    if args.count < 1:
        raise SystemExit("count must be at least 1")
    if args.interval < 0:
        raise SystemExit("interval must be >= 0")

    time.sleep(5)

    for _ in range(args.count):
        click_once()
        if args.interval:
            time.sleep(args.interval)


if __name__ == "__main__":
    main()
