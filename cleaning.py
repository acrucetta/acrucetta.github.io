import os

# Set the directory where the files are located
directory = '_posts'

# Iterate through all the files in the directory
for filename in os.listdir(directory):
    # Split the filename on the '_' character to get the date and title
    if '_' in filename:
        new_filename = filename.replace('_','-')
        # Use the os.rename function to rename the file
        os.rename(os.path.join(directory, filename), os.path.join(directory, new_filename))

