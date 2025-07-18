import { Box, styled, Text } from "@isz-dsystem/react";

export const ConnectBox = styled(Box, {
  margin: '$6',
  display: 'flex',
  flexDirection: 'column',
  gap: '$4'
})

export const ConnectItem = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',

  border: '1px solid $gray600',
  padding: '$4 $6',
  borderRadius: '$md',
})

export const AuthError = styled(Text, {
  color: '#f75a68',
})