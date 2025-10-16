#!/bin/bash
echo "Creating downloadable archive..."
cd /tmp
tar -czf join-project.tar.gz -C /home/runner/workspace \
  --exclude=node_modules \
  --exclude=.git \
  --exclude='*.log' \
  --exclude=.cache \
  --exclude=tmp \
  --exclude=attached_assets \
  .
mv join-project.tar.gz /home/runner/workspace/
echo "Archive created: join-project.tar.gz"
ls -lh /home/runner/workspace/join-project.tar.gz
