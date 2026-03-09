#!/bin/bash
# Add a new podcast episode to the feed
# Usage: ./add-podcast-episode.sh <mp3_file> <title> <description>

set -e

MP3_FILE="$1"
TITLE="$2"
DESCRIPTION="$3"

if [ -z "$MP3_FILE" ] || [ -z "$TITLE" ]; then
  echo "Usage: $0 <mp3_file> <title> [description]"
  exit 1
fi

PODCAST_DIR="$(dirname "$0")/../public/podcast"
EPISODES_DIR="$PODCAST_DIR/episodes"
FEED_FILE="$PODCAST_DIR/feed.xml"

# Generate episode ID based on date
DATE=$(date +%Y-%m-%d)
EP_NUM=$(ls -1 "$EPISODES_DIR"/*.mp3 2>/dev/null | wc -l)
EP_NUM=$((EP_NUM + 1))
EP_ID=$(printf "ep-%03d-%s" $EP_NUM $DATE)

# Copy MP3 to episodes folder
FILENAME="${EP_ID}.mp3"
cp "$MP3_FILE" "$EPISODES_DIR/$FILENAME"

# Get file size
FILESIZE=$(stat -c%s "$EPISODES_DIR/$FILENAME")

# Get duration using ffprobe (if available)
if command -v ffprobe &> /dev/null; then
  DURATION=$(ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "$EPISODES_DIR/$FILENAME" | cut -d. -f1)
  MINS=$((DURATION / 60))
  SECS=$((DURATION % 60))
  DURATION_STR=$(printf "%d:%02d" $MINS $SECS)
else
  DURATION_STR="10:00"
  echo "Warning: ffprobe not found, using default duration"
fi

# Format date for RSS
PUBDATE=$(date -R)

# Create episode XML
EPISODE_XML="    <item>
      <title>$TITLE</title>
      <description><![CDATA[$DESCRIPTION]]></description>
      <pubDate>$PUBDATE</pubDate>
      <enclosure url=\"https://pierry.github.io/podcast/episodes/$FILENAME\" length=\"$FILESIZE\" type=\"audio/mpeg\"/>
      <guid isPermaLink=\"false\">$EP_ID</guid>
      <itunes:duration>$DURATION_STR</itunes:duration>
      <itunes:explicit>false</itunes:explicit>
      <itunes:episodeType>full</itunes:episodeType>
    </item>"

# Insert episode into feed (before closing </channel> tag)
# Update lastBuildDate
sed -i "s|<lastBuildDate>.*</lastBuildDate>|<lastBuildDate>$PUBDATE</lastBuildDate>|" "$FEED_FILE"

# Add episode before </channel>
sed -i "s|</channel>|$EPISODE_XML\n\n  </channel>|" "$FEED_FILE"

echo "✅ Episode added: $FILENAME"
echo "   Title: $TITLE"
echo "   Duration: $DURATION_STR"
echo "   Size: $FILESIZE bytes"
echo ""
echo "Next steps:"
echo "  1. git add ."
echo "  2. git commit -m 'Add podcast episode: $TITLE'"
echo "  3. git push"
