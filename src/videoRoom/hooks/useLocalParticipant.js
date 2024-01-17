import { useEffect, useState } from 'react'

export const useLocalParticipant = (room) => {
  const [localParticipant, setLocalParticipant] = useState(
    room?.localParticipant,
  )
  const [localParticipantState, setLocalParticipantState] = useState(
    localParticipant?.state,
  )

  useEffect(() => {
    if (room) {
      setLocalParticipant(room.localParticipant)
      setLocalParticipantState(room.localParticipant.state)
      const reconnectingListener = () =>
        setLocalParticipantState('reconnecting')
      const reconnectedListener = () => setLocalParticipantState('connected')
      room.on('reconnected', reconnectedListener)
      room.on('reconnecting', reconnectingListener)

      return () => {
        room.removeListener('reconnecting', reconnectingListener)
        room.removeListener('reconnected', reconnectedListener)
      }
    }
  }, [localParticipant, room])

  return [localParticipant, localParticipantState]
}
