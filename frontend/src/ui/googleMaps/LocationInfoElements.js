import styled from 'styled-components'

import { MdClose } from 'react-icons/md'

export const CloseModalButton = styled(MdClose)`
	cursor: pointer;
	position: absolute;
	top: 20px;
	right: 20px;
	width: 32px;
	height: 32px;
	padding: 0;
	z-index: 10;
`
