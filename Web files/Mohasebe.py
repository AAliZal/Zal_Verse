import os
import time

# ===============================
#         Site Analyzer
# ===============================

start_time = time.time()
BASE_PATH = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))


# Colors
RESET = "\033[0m"
RED = "\033[91m"
GREEN = "\033[92m"
YELLOW = "\033[93m"
BLUE = "\033[94m"
MAGENTA = "\033[95m"
CYAN = "\033[96m"
WHITE = "\033[97m"
BOLD = "\033[1m"

EXCLUDED_CARDS = {
    "Lobby.html",
    "-- Lobby.html",
    "index.html"
}

files = {
    "html": [],
    "css": [],
    "js": [],
    "py": []
}

line_counts = {
    "html": 0,
    "css": 0,
    "js": 0,
    "py": 0
}

line_details = {
    "code": 0,
    "empty": 0,
    "comment": 0
}

total_lines = 0
total_size = 0

biggest_file = ""
biggest_lines = 0

file_stats = []

# ===============================
# Helper Functions
# ===============================

def human_size(size):
    units = ["B", "KB", "MB", "GB"]
    i = 0
    while size >= 1024 and i < len(units)-1:
        size /= 1024
        i += 1
    return f"{size:.2f} {units[i]}"

def progress(value, maximum, length=22):
    if maximum == 0:
        return "-" * length

    filled = int((value / maximum) * length)
    return "█" * filled + "░" * (length - filled)

# ===============================
# Scan Project
# ===============================

for root, dirs, fs in os.walk(BASE_PATH):
    for file in fs:

        path = os.path.relpath(os.path.join(root, file), BASE_PATH)
        # حساب حجم کل پروژه (همه فایل ها)
        try:
            total_size += os.path.getsize(path)
        except:
            pass


        ext = os.path.splitext(file)[1].lower()


        # فقط فایل های کدنویسی
        if ext not in [".html", ".css", ".js", ".py"]:
            continue


        if ext == ".html":
            files["html"].append(path)

        elif ext == ".css":
            files["css"].append(path)

        elif ext == ".js":
            files["js"].append(path)

        elif ext == ".py":
            files["py"].append(path)


        try:
            with open(path, "r", encoding="utf-8") as f:

                content = f.readlines()

                lines = len(content)

                for line in content:

                    stripped = line.strip()

                    if stripped == "":
                        line_details["empty"] += 1

                    elif (
                        stripped.startswith("#")
                        or stripped.startswith("//")
                        or stripped.startswith("<!--")
                    ):
                        line_details["comment"] += 1

                    else:
                        line_details["code"] += 1

            total_lines += lines


            if ext == ".html":
                line_counts["html"] += lines

            elif ext == ".css":
                line_counts["css"] += lines

            elif ext == ".js":
                line_counts["js"] += lines

            elif ext == ".py":
                line_counts["py"] += lines


            # برای Top 5 و بزرگترین فایل
            file_stats.append((path, lines))


            if lines > biggest_lines:
                biggest_lines = lines
                biggest_file = path


        except:
            pass
# ===============================
# Main Statistics
# ===============================

cards = 0

for file in files["html"]:

    if os.path.basename(file) not in EXCLUDED_CARDS:
        cards += 1

all_files = (
    len(files["html"])
    + len(files["css"])
    + len(files["js"])
    + len(files["py"])
)

scan_time = time.time() - start_time

top_files = sorted(
    file_stats,
    key=lambda x: x[1],
    reverse=True
)[:5]

folders = set()

for root, dirs, fs in os.walk(BASE_PATH):

    for d in dirs:
        folders.add(os.path.join(root, d))

# ===============================
#          Display Banner
# ===============================

print(
    GREEN + BOLD +
    """
╔══════════════════════════════════════════════╗
║              ⭐ SITE ANALYZER ⭐             ║
║          Project Information Tool            ║
╚══════════════════════════════════════════════╝
"""
    + RESET
)


# ===============================
#          Main Information
# ===============================

print(CYAN + "=" * 50)
print("              Project Information")
print("=" * 50 + RESET)

print(f"{BLUE}HTML File Ha      : {WHITE}{len(files['html'])}")
print(f"{BLUE}CSS File Ha       : {WHITE}{len(files['css'])}")
print(f"{BLUE}JS File Ha        : {WHITE}{len(files['js'])}")
print(f"{BLUE}Python File Ha    : {WHITE}{len(files['py'])}")

print(f"{YELLOW}Kol File Ha       : {WHITE}{all_files}")
print(f"{MAGENTA}Card Ha            : {WHITE}{cards}")
print(f"{GREEN}Kol Khat Code     : {WHITE}{total_lines}")

print(f"{GREEN}Code Lines        : {WHITE}{line_details['code']}")
print(f"{YELLOW}Empty Lines       : {WHITE}{line_details['empty']}")
print(f"{MAGENTA}Comment Lines     : {WHITE}{line_details['comment']}")
print()


# ===============================
#          Project Analysis
# ===============================

print(GREEN + "=" * 50)
print("              Project Analysis")
print("=" * 50 + RESET)


print(
    f"{CYAN}Project Size      : "
    f"{WHITE}{human_size(total_size)}"
)

print(
    f"{CYAN}Scan Time         : "
    f"{WHITE}{scan_time:.3f} sec"
)

print()


# ===============================
#          Language Usage
# ===============================

print(YELLOW + "=" * 50)
print("              Language Usage")
print("=" * 50 + RESET)


languages = [
    ("HTML", "html"),
    ("CSS", "css"),
    ("JS", "js"),
    ("PY", "py")
]


for name, key in languages:

    lines = line_counts[key]

    if total_lines:
        percent = (lines / total_lines) * 100
    else:
        percent = 0

    print(
        f"{CYAN}{name:<6}"
        f"{WHITE}: "
        f"{lines:<8}"
        f"{GREEN}{percent:.1f}%"
    )

    print(
        f"       "
        f"{MAGENTA}"
        f"{progress(lines, total_lines)}"
        f"{RESET}"
    )

print()


# ===============================
#          Biggest File
# ===============================

print(RED + "=" * 50)
print("              Biggest File")
print("=" * 50 + RESET)


if biggest_file:

    print(
        f"{YELLOW}{biggest_file}"
        f"{WHITE}"
        f"  ({biggest_lines} Lines)"
    )

else:

    print("No File Found")


print()


# ===============================
#          Top 5 Files
# ===============================

print(MAGENTA + "=" * 50)
print("          Top 5 Biggest Files")
print("=" * 50 + RESET)


number = 1

for file, lines in top_files:

    print(
        f"{GREEN}#{number}"
        f"{WHITE} "
        f"{file}"
        f"  "
        f"{YELLOW}{lines} Lines"
    )

    number += 1


print()

# ===============================
#          File Lists
# ===============================


def show_files(title, file_list, color):

    print(color + "=" * 50)
    print(title)
    print("=" * 50 + RESET)


    if len(file_list) == 0:
        print("No File Found")
        print()
        return


    for file in file_list:
        print(f"{WHITE}- {file}")

    print()



show_files(
    "HTML File Ha",
    files["html"],
    BLUE
)


show_files(
    "CSS File Ha",
    files["css"],
    CYAN
)


show_files(
    "JS File Ha",
    files["js"],
    YELLOW
)


show_files(
    "Python File Ha",
    files["py"],
    MAGENTA
)


# ===============================
#          Finish
# ===============================

print(GREEN + "=" * 50)
print("          Scan Completed ✅")
print("=" * 50 + RESET)