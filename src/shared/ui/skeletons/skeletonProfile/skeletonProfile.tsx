import classes from './skeletonProfile.module.scss'

export const SkeletonProfile = () => {
  return (
    <section className={classes.skeleton}>
      <div className={classes.skeletonBlockAvatar}>
        <img src="Avatar" alt="Avatar" className={classes.skeletonAvatar} />
        <button className={classes.skeletonBtn}></button>
        <button className={classes.skeletonBtnDel}></button>
      </div>
      <div className={classes.skeletonInformation}>
        <ul className={classes.skeletonList}>
          <li className={classes.skeletonElem}>1</li>
          <li className={classes.skeletonElem}></li>
          <li className={classes.skeletonElem}></li>
          <li className={classes.skeletonElem}></li>
        </ul>
        <button className={classes.skeletonBtn}></button>
      </div>
    </section>
  )
}
