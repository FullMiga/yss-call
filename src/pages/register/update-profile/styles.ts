import { Box, styled, Text } from "@isz-dsystem/react";

export const ProfileBox = styled(Box, {
  marginTop: '$6',
  display: 'flex',
  flexDirection: 'column',
  gap: '$4',

  label: {
    display: 'flex',
    flexDirection: 'column',
    gap: '$2',
  }
})

export const FormAnnotation = styled(Text, {
  color: '$gray200'
})