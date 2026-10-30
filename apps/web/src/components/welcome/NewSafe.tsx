import React from 'react'
import css from './styles.module.css'
import WelcomeLogin from './WelcomeLogin'
import WelcomeRightPanel from './WelcomeRightPanel'
import SafeLogo from '@/public/images/logo.svg'
import footerCss from './welcomeFooter.module.css'
import Footer from '../common/Footer'
import TEMPLATE_CONFIG from '@/config/templateConfig'

const NewSafe = () => {
  return (
    <div className={css.loginPage}>
      <div className={css.leftSide}>
        <div className={css.logoContainer}>
          <SafeLogo className={css.logo} />
        </div>
        <div className={css.loginContainer}>
          <WelcomeLogin />
        </div>
        <Footer forceShow versionIcon={false} helpCenter={false} preferences={false} className={footerCss.footer} />
      </div>

      <div
        className={css.rightSide}
        style={{
          background: TEMPLATE_CONFIG.WELCOME_PALETTE
            ? `linear-gradient(-90deg, ${TEMPLATE_CONFIG.WELCOME_PALETTE})`
            : TEMPLATE_CONFIG.IS_LICENSED
            ? 'linear-gradient(-90deg, #10b8ff, #b2efff)'
            : undefined,
        }}
      >
        <WelcomeRightPanel />
      </div>
    </div>
  )
}

export default NewSafe
