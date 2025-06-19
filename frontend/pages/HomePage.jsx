import { useNavigate } from 'react-router-dom'
import { logout } from '../utils/auth'
import { showToast } from '@/utils/ui'
import ProfileCard from '@/components/ProfileCard'
import KudosCard from '@/components/KudosCard'
import ReceivedKudosCard from '@/components/ReceivedKudosCard'
import { useState, useEffect } from 'react'
import { getMe, getUsers } from '@/services/userService'
import { getReceivedKudos, getGivenKudos, createKudo } from '@/services/kudoService'
import { handleApiError } from '@/lib/utils'

const HomePage = () => {
  const [profile, setProfile] = useState(null)
  const [orgUsers, setOrgUsers] = useState([])
  const [kudos, setKudos] = useState([])
  const [givenKudos, setGivenKudos] = useState([])
  const navigate = useNavigate()

  const fetchProfile = async () => {
    setProfile(await getMe())
  }

  const fetchKudos = async () => {
    setKudos(await getReceivedKudos())
  }

  const fetchGivenKudos = async () => {
    setGivenKudos(await getGivenKudos())
  }

  const fetchOrgUsers = async () => {
    setOrgUsers(await getUsers())
  }

  const handleLogout = () => {
      logout()
      showToast('Logged out successfully')
      navigate('/login')
  }

  const handleGiveKudo = async (data, setError, successCallback=null) =>{
    try {
      await createKudo(data)
      showToast('Kudos sent')
      fetchProfile()
      fetchGivenKudos()
      if(successCallback){
        successCallback()
      }
    } catch (error) {
      handleApiError(error, setError, 'message')
    } finally {
    }
  }

  useEffect(() => {
    fetchProfile()
    fetchKudos()
    fetchGivenKudos()
    fetchOrgUsers()
  }, [])

  if (!profile) return null

  return (
    <>
      <ProfileCard profile={profile} handleLogout={handleLogout} />
      <KudosCard handleGiveKudo={handleGiveKudo} kudos={givenKudos} kudosAvailable={profile.kudos_available} users={orgUsers}/>
      <ReceivedKudosCard kudos={kudos}/>
    </>
  )
}

export default HomePage
