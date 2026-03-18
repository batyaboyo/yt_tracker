#!/usr/bin/env python3
import re

# Read the file
with open('script.js', 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Find and modify renderAll function
in_renderAll = False
modified_lines = []
i = 0
while i < len(lines):
    line = lines[i]
    
    # Look for the calendar condition
    if "else if (activeTab === 'calendar')" in line:
        # Write the calendar case
        modified_lines.append(line)
        i += 1
        # Get the renderCalendar() line
        modified_lines.append(lines[i])
        i += 1
        # Add schedule case before settings
        modified_lines.append("    } else if (activeTab === 'schedule') {\n")
        modified_lines.append("        renderScheduleHeatmap();\n")
        modified_lines.append("        renderChannelScheduleDetails();\n")
        # Now add settings
        continue
    elif "function initForms()" in line:
        modified_lines.append(line)
        i += 1
        modified_lines.append("    initTimezoneSelector();\n")
        continue
    
    modified_lines.append(line)
    i += 1

# Write back
with open('script.js', 'w', encoding='utf-8') as f:
    f.writelines(modified_lines)

print("✅ Updated script.js successfully")
