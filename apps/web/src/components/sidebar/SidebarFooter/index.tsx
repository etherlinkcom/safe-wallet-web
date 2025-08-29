import type { ReactElement } from 'react'
import { useEffect } from 'react'

import { SidebarListItemButton, SidebarListItemIcon, SidebarListItemText } from '@/components/sidebar/SidebarList'
import { loadBeamer } from '@/services/beamer'
import { useAppSelector } from '@/store'
import { CookieAndTermType, hasConsentFor } from '@/store/cookiesAndTermsSlice'
import { Box, Divider, ListItem, SvgIcon, Typography, useTheme } from '@mui/material'
import DebugToggle from '../DebugToggle'
import { IS_PRODUCTION, NEW_SUGGESTION_FORM, PROTOFIRE_SUPPORT_LINK } from '@/config/constants'
import { useCurrentChain } from '@/hooks/useChains'
import ProtofireLogo from '@/public/images/protofire-logo.svg'
import HelpCenterIcon from '@/public/images/sidebar/help-center.svg'
import SuggestionIcon from '@/public/images/sidebar/lightbulb_icon.svg'
import ExternalLink from '@/components/common/ExternalLink'

const SidebarFooter = (): ReactElement => {
  const chain = useCurrentChain()
  const theme = useTheme()
  const hasBeamerConsent = useAppSelector((state) => hasConsentFor(state, CookieAndTermType.UPDATES))

  useEffect(() => {
    // Initialize Beamer when consent was previously given
    if (hasBeamerConsent && chain?.shortName) {
      loadBeamer(chain.shortName)
    }
  }, [hasBeamerConsent, chain?.shortName])

  return (
    <>
      {!IS_PRODUCTION && (
        <>
          <ListItem disablePadding>
            <DebugToggle />
          </ListItem>

          <Divider flexItem />
        </>
      )}

      {/* <Track {...OVERVIEW_EVENTS.WHATS_NEW}>
        <ListItem disablePadding>
          <SidebarListItemButton id={BEAMER_SELECTOR}>
            <SidebarListItemIcon color="primary">
              <HelpCenterIcon />
            </SidebarListItemIcon>
            <SidebarListItemText data-testid="list-item-need-help" bold>
              What&apos;s New
            </SidebarListItemText>
          </SidebarListItemButton>
        </ListItem>
      </Track> */}

      {/* Help Center link removed. To restore, import HELP_CENTER_URL from '@/config/constants' */}
      <ListItem style={{ padding: 'var(--space-1)' }}>
        <a target="_blank" rel="noopener noreferrer" href={PROTOFIRE_SUPPORT_LINK} style={{ width: '100%' }}>
          <SidebarListItemButton>
            <SidebarListItemIcon color="primary">
              <HelpCenterIcon />
            </SidebarListItemIcon>
            <SidebarListItemText data-testid="list-item-need-help" bold>
              Need help?
            </SidebarListItemText>
          </SidebarListItemButton>
        </a>
      </ListItem>

      <ListItem style={{ padding: '0 var(--space-1) 0' }}>
        <a target="_blank" rel="noopener noreferrer" href={NEW_SUGGESTION_FORM} style={{ width: '100%' }}>
          <SidebarListItemButton
            style={{
              color: 'black',
              backgroundColor:
                theme.palette.mode === 'dark' ? theme.palette.primary.main : theme.palette.secondary.main,
            }}
          >
            <SidebarListItemIcon>
              <Box
                sx={{
                  '& svg': {
                    '& path': () => ({
                      fill: 'black !important',
                    }),
                  },
                }}
              >
                <SuggestionIcon />
              </Box>
            </SidebarListItemIcon>
            <SidebarListItemText bold>New Features Suggestion?</SidebarListItemText>
          </SidebarListItemButton>
        </a>
      </ListItem>

      <ListItem>
        <SidebarListItemText>
          <Typography variant="caption" sx={{ mx: 'auto', textAlign: 'center' }}>
            Supported by{' '}
            <SvgIcon
              component={ProtofireLogo}
              inheritViewBox
              fontSize="small"
              sx={{ verticalAlign: 'middle', mx: 0.5 }}
            />
            <ExternalLink href="https://protofire.io" sx={{ textDecoration: 'none' }} noIcon>
              Protofire
            </ExternalLink>
          </Typography>
        </SidebarListItemText>
      </ListItem>
    </>
  )
}

export default SidebarFooter
