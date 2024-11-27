import { useState, useEffect } from 'react'

interface NotificationPopupProps {
	message: string
}

const NotificationPopup = ({ message }: NotificationPopupProps) => {
	const [visible, setVisible] = useState(false)

	useEffect(() => {
		if (message) {
			setVisible(true)
			const timer = setTimeout(() => {
				setVisible(false)
			}, 5000) // 5秒後に非表示にする

			return () => clearTimeout(timer)
		}
	}, [message])

	if (!visible) return null

	return (
		<div
			style={{
				position: 'fixed',
				bottom: '20px',
				left: '50%',
				transform: 'translateX(-50%)',
				backgroundColor: 'rgba(0, 0, 0, 0.8)',
				color: 'white',
				padding: '10px 20px',
				borderRadius: '5px',
				boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
				zIndex: 1000,
			}}
		>
			{message}
		</div>
	)
}

export default NotificationPopup
