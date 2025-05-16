import React, { useEffect, useState } from 'react'
import { Button, ScrollView, Text, View } from 'react-native'
import CastContext, { useCastChannel, useCastSession } from 'op-google-cast'

export default function Session() {
  const [lastMessage, setLastMessage] = useState<{}>()

  const session = useCastSession({ ignoreSessionUpdatesInBackground: true })
  const castChannel = useCastChannel(
    'urn:x-cast:com.reactnative.googlecast.playground',
    setLastMessage,
    { ignoreSessionUpdatesInBackground: true }
  )

  const [mute, setMute] = useState(false)
  const [volume, setVolume] = useState(0)

  useEffect(() => {
    if (session) {
      session.isMute().then(setMute)
      session.getVolume().then(setVolume)
    } else {
      setMute(false)
      setVolume(0)
    }
  }, [session])

  if (!session)
    return (
      <Text style={{ margin: 10 }}>
        Connect to a Cast device to establish a session
      </Text>
    )

  return (
    <ScrollView contentContainerStyle={{ padding: 10 }}>
      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'center',
        }}
      >
        <Button
          disabled={volume <= 0.0}
          onPress={async () => {
            session?.setVolume(round(volume - 0.1))
            setTimeout(() => session?.getVolume().then(setVolume), 100)
          }}
          title="-0.1"
        />

        <Text style={{ margin: 5 }}>Volume: {round(volume)}</Text>

        <Button
          disabled={volume >= 1.0}
          onPress={async () => {
            session?.setVolume(round(volume + 0.1))
            setTimeout(() => session?.getVolume().then(setVolume), 100)
          }}
          title="+0.1"
        />

        <View style={{ marginLeft: 10 }}>
          <Button
            onPress={async () => {
              session?.setMute(!mute)
              setTimeout(() => session?.isMute().then(setMute), 100)
            }}
            title={mute ? 'Unmute' : 'Mute'}
          />
        </View>
      </View>

      <View style={{ marginTop: 10 }}>
        <Button
          onPress={() => {
            console.log('channel', castChannel)

            castChannel
              ?.sendMessage({ message: 'Hello, world!' })
              .catch(console.error)
          }}
          title="Send Message"
        />
      </View>

      {lastMessage && (
        <Text>Last received message: {JSON.stringify(lastMessage)}</Text>
      )}

      <View style={{ marginTop: 10 }}>
        <Button
          onPress={() => CastContext.getSessionManager().endCurrentSession()}
          title="End Session"
        />
      </View>
    </ScrollView>
  )
}

function round(number: number, decimals = 1) {
  const factor = Math.pow(10, decimals)
  return Math.round(number * factor) / factor
}
