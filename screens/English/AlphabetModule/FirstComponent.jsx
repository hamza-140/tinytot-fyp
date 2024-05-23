import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import Card from '../../../components/Card';
import Sound from 'react-native-sound';

const FirstComponent = ({ item, setProgress, progress }) => {
  const [sounds, setSounds] = useState({});

  useEffect(() => {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    const loadedSounds = {};

    alphabet.split('').forEach(letter => {
      const soundPath = `${letter}.mp3`;

      const newSound = new Sound(soundPath, Sound.MAIN_BUNDLE, error => {
        if (error) {
          console.error(`Error loading sound for ${letter}`, error);
        } else {
          loadedSounds[letter] = newSound;
        }
      });
    });

    setSounds(loadedSounds);

    return () => {
      Object.values(loadedSounds).forEach(loadedSound => {
        if (loadedSound) {
          loadedSound.release();
        }
      });
    };
  }, []);

  const start = letter => {
    const sound = sounds[letter];
    if (sound) {
      sound.play(() => {
        if (progress === 0) {
          setProgress(20);
        } else {
          setProgress(progress);
        }
      });
    }
  };

  const imageMapping = {
    a: require('../../../assets/images/alphabetsImages/a.png'),
    b: require('../../../assets/images/alphabetsImages/b.png'),
    c: require('../../../assets/images/alphabetsImages/c.png'),
    d: require('../../../assets/images/alphabetsImages/d.png'),
    e: require('../../../assets/images/alphabetsImages/e.png'),
    f: require('../../../assets/images/alphabetsImages/f.png'),
    g: require('../../../assets/images/alphabetsImages/g.png'),
    h: require('../../../assets/images/alphabetsImages/h.png'),
    i: require('../../../assets/images/alphabetsImages/i.png'),
    j: require('../../../assets/images/alphabetsImages/j.png'),
    k: require('../../../assets/images/alphabetsImages/k.png'),
    l: require('../../../assets/images/alphabetsImages/l.png'),
    m: require('../../../assets/images/alphabetsImages/m.png'),
    n: require('../../../assets/images/alphabetsImages/n.png'),
    o: require('../../../assets/images/alphabetsImages/o.png'),
    p: require('../../../assets/images/alphabetsImages/p.png'),
    q: require('../../../assets/images/alphabetsImages/q.png'),
    r: require('../../../assets/images/alphabetsImages/r.png'),
    s: require('../../../assets/images/alphabetsImages/s.png'),
    t: require('../../../assets/images/alphabetsImages/t.png'),
    u: require('../../../assets/images/alphabetsImages/u.png'),
    v: require('../../../assets/images/alphabetsImages/v.png'),
    w: require('../../../assets/images/alphabetsImages/w.png'),
    x: require('../../../assets/images/alphabetsImages/x.png'),
    y: require('../../../assets/images/alphabetsImages/y.png'),
    z: require('../../../assets/images/alphabetsImages/z.png'),
  };


  return (
    <View style={{ display: 'flex', alignItems: 'center' }}>
      <Card status={false} letter={item} onPress={() => start(item)} imageSource={imageMapping[item]} />
    </View>
  );
};

export default FirstComponent;
