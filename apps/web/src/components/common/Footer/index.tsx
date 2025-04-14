import type { ReactElement, ReactNode } from 'react'
import { SvgIcon } from '@mui/material'
import GitHubIcon from '@mui/icons-material/GitHub'
import Link from 'next/link'
import { useRouter } from 'next/router'
import css from './styles.module.css'
import { AppRoutes } from '@/config/routes'
import packageJson from '../../../../package.json'
import ExternalLink from '../ExternalLink'
import MUILink from '@mui/material/Link'
import { DISCORD_URL, TWITTER_URL } from '@/config/constants'
//import { useIsOfficialHost } from '@/hooks/useIsOfficialHost'
//import ProtofireLogo from '@/public/images/protofire-logo.svg'
import TwitterIcon from '@mui/icons-material/Twitter'
import DiscordIcon from '@/public/images/common/discord-icon.svg'
import React from 'react'
//import darkPalette from '@/components/theme/darkPalette'

const footerPages = [
  AppRoutes.welcome.index,
  AppRoutes.settings.index,
  AppRoutes.imprint,
  AppRoutes.privacy,
  AppRoutes.cookie,
  AppRoutes.terms,
  AppRoutes.licenses,
]

const FooterLink: React.FC<{ children: ReactNode; href: string }> = ({
  children,
  href,
}: {
  children: ReactNode
  href: string
}) => {
  return href ? (
    <Link href={href} passHref legacyBehavior>
      <MUILink>{children}</MUILink>
    </Link>
  ) : (
    <MUILink>{children}</MUILink>
  )
}

const Footer = (): ReactElement | null => {
  const router = useRouter()
  //const isOfficialHost = useIsOfficialHost()

  if (!footerPages.some((path) => router.pathname.startsWith(path))) {
    return null
  }

  const getHref = (path: string): string => {
    return router.pathname === path ? '' : path
  }

  return (
    <footer className={css.container}>
      <ul>
        <li>
          <FooterLink href={getHref(AppRoutes.terms)}>Terms</FooterLink>
        </li>
        <li>
          <FooterLink href={getHref(AppRoutes.cookie)}>Cookie policy</FooterLink>
        </li>
        <li>
          <ExternalLink href={TWITTER_URL} noIcon>
            X
          </ExternalLink>
        </li>
        <li>
          <ExternalLink href={DISCORD_URL} noIcon>
            <SvgIcon component={DiscordIcon} inheritViewBox fontSize="inherit" sx={{ mr: 0.5 }} /> Discord
          </ExternalLink>
        </li>
        <li>
          <FooterLink href={getHref(AppRoutes.settings.index)}>Preferences</FooterLink>
        </li>
        <li>
          <ExternalLink href={`${packageJson.homepage}/releases/tag/v${packageJson.version}`} noIcon>
            <SvgIcon component={GitHubIcon} inheritViewBox fontSize="inherit" sx={{ mr: 0.5 }} /> v{packageJson.version}
          </ExternalLink>
        </li>
      </ul>
    </footer>
  )
}

export default Footer
