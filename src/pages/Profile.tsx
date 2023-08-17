import { Loader } from '../components/Loader';
import { MenuBar } from '../components/MenuBar';
import { useUser } from '../hooks/useUser';
import styles from '../styles/pages/Profile.module.css';
import { User } from '../types/UserTypes';
import mailIcon from '../assets/icons/mail.svg';

const ProfileSummary = ({ user }: { user: User }) => {

  const onClickMailIcon = () => {
    window.open(`mailto:${user.email}`);
  }

  return (
    <div className={styles.profileSummary}>
      <div className={styles.profilePicture}>
        <img src={'https://www.comingsoon.net/wp-content/uploads/sites/3/2023/07/Oppenheimer-True-Story.jpg'} />
      </div>
      <div className={styles.bio}>
        <h2 className={styles.name}>
          {user.forename}&nbsp;{user.surname}
        </h2>
        <h3 className={styles.username}>{user.username}</h3>
        <div className={styles.contactInfo}>
          <h2>Contact Info</h2>
          <div className='flex w-full border-2 border-[#003e66]'/>
          <h3 className={styles.email} onClick={onClickMailIcon}>
            {user.email}
            <img className='w-16' src={mailIcon} />
          </h3>
        </div>
      </div>
    </div>
  )
}

export const Profile = () => {
  const user = useUser();

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileHeader}>
        <h1>Profile</h1>
      </div>
      {user ? <ProfileSummary user={user} /> : <Loader />}
      <MenuBar menuIndex={3}/>
    </div>
  )
}