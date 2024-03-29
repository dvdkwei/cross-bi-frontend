import { Loader } from '../components/Loader';
import { MenuBar } from '../components/MenuBar';
import { useUser } from '../hooks/useUser';
import styles from '../styles/pages/Profile.module.css';
import { User } from '../types/UserTypes';
import mailIcon from '../assets/icons/mail.svg';
import profpic from '../assets/profile-picture.png';
import { SwipeNavigation } from '../components/SwipeNavigation';
import { useLocation } from 'react-router-dom';

const ProfileSummary = ({ user }: { user: User }) => {
  const onClickMailIcon = () => {
    window.open(`mailto:${user.email}`);
  }

  return (
    <div className={styles.profileSummary}>
      <div className={styles.profilePicture}>
        <img src={profpic} />
      </div>
      <div className={styles.bio}>
        <h2 className={styles.name}>
          {user.forename}&nbsp;{user.surname}
        </h2>
        <h3 className={styles.username}>{user.username}</h3>
        <div className={styles.contactInfo}>
          <h2>Contact Info</h2>
          <div className='flex w-full border-2 border-[#003e66]' />
          <h3 className={styles.email} onClick={onClickMailIcon}>
            {user.email}
            <img className='w-6' src={mailIcon} />
          </h3>
        </div>
      </div>
    </div>
  )
}

export const Profile = () => {
  const { currentUser } = useUser();
  const { state } = useLocation();

  return (
    <>
      <div
        className={styles.profileContainer}
        style={state?.transition ? { animation: `.3s ease-out ${state.transition}` } : {}}
      >
        <SwipeNavigation
          onSwipeLeftRoute={'/upload'}
          onSwipeRightRoute={'/settings'}
        />
        <div className={styles.profileHeader}>
          <h1>Profile</h1>
        </div>
        {currentUser ? <ProfileSummary user={currentUser} /> : <Loader />}
      </div>
      <MenuBar menuIndex={3} />
    </>
  )
}