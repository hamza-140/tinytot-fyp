import React, {useEffect, useState} from 'react';
import {
  View,
  ActivityIndicator,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Image} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {getYoutubeMeta} from 'react-native-youtube-iframe'; // Import getYoutubeMeta
import firestore from '@react-native-firebase/firestore';

const extractVideoId = url => {
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/|.+?v=))([^?&]+)/,
  );
  return match ? match[1] : null;
};

const LessonCard = ({title, status, onPress}) => {
  const locked = !status; // Determine if the card should be locked
  const [thumbnailUrl, setThumbnailUrl] = useState(null);
  const [videoId, setVideoId] = useState(null);

  useEffect(() => {
    const fetchVideoUrl = async () => {
      try {
        const doc = await firestore()
          .collection('islamVideos')
          .doc(title)
          .get();
        if (doc.exists) {
          const videoUrl = doc.data().url;
          const id = extractVideoId(videoUrl);
          setVideoId(id);
        } else {
          console.error('No video URL found for this letter');
        }
      } catch (error) {
        console.error('Error fetching video URL:', error);
      }
    };

    fetchVideoUrl();
  }, [title]);

  useEffect(() => {
    if (videoId) {
      const fetchThumbnail = async () => {
        try {
          const meta = await getYoutubeMeta(videoId);
          setThumbnailUrl(meta.thumbnail_url);
        } catch (error) {
          console.error('Error fetching thumbnail:', error);
        }
      };

      fetchThumbnail();
    }
  }, [videoId]);
  return (
    <TouchableOpacity disabled={locked} onPress={onPress}>
      <View style={[styles.card, locked && styles.lockedCard]}>
        {thumbnailUrl ? (
          <Image
            source={{uri: thumbnailUrl}}
            style={styles.thumbnail}
            resizeMode="cover"
          />
        ) : (
          <ActivityIndicator style={styles.placeholder}></ActivityIndicator>
        )}
        {locked && (
          <View style={styles.lockOverlay}>
            <Icon name="lock" size={40} color="#ffffff" />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 300,
    height: 200,
    margin: 10,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#ffd700',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: {width: 0, height: 5},
  },
  lockedCard: {
    backgroundColor: '#a52a2a',
  },
  lockOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumbnail: {
    width: '100%', // Ensure the image takes up the full width
    height: '100%', // Ensure the image takes up the full height
  },
  placeholder: {
    flex: 1,
    backgroundColor: '#ccc', // Placeholder background color
  },
});

export default LessonCard;
