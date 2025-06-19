import { useNavigate } from 'react-router-dom'
import { logout } from '../utils/auth'
import { showToast } from '@/utils/ui'
import ProfileCard from '@/components/ProfileCard'
import KudosCard from '@/components/KudosCard'
import GivenKudosCard from '@/components/GivenKudosCard'
import { useState, useEffect } from 'react'
import { getMe } from '@/services/userService'
import { getReceivedKudos, getGivenKudos } from '@/services/kudoService'

const HomePage = () => {
  const navigate = useNavigate()
  const handleLogout = () => {
    logout()
    showToast('Logged out successfully')
    navigate('/login')
  }

  const [profile, setProfile] = useState(null)
  const [kudos, setKudos] = useState([])
  const [givenKudos, setGivenKudos] = useState([])

  const fetchProfile = async () => {
    setProfile(await getMe())
  }

  const fetchKudos = async () => {
    setKudos(await getReceivedKudos())
  }

  const fetchGivenKudos = async () => {
    setGivenKudos(await getGivenKudos())
  }

  useEffect(() => {
    fetchProfile()
    fetchKudos()
    fetchGivenKudos()
  }, [])

  if (!profile) return null

  return (
    <>
      <ProfileCard profile={profile} handleLogout={handleLogout} />
      <KudosCard kudos={kudos} kudosAvailable={profile.kudos_available}/>
      <GivenKudosCard kudos={givenKudos}/>
    </>
  )
}

export default HomePage
