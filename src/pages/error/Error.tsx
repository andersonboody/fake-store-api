import classes from './Error.module.scss'
import { Logo } from '@/shared/ui/logo/logo'
import { Container } from '@/widgets/Container/Container'

const Error = () => {
  return (
    <Container>
      <section className={classes.error}>
        <div className={classes.errorHeader}>
          <Logo />
        </div>
        <div className={classes.errorMain}>Мы не смогли найти указанную вами страницу, проверьте адресс!</div>
      </section>
    </Container>
  )
}

export default Error
