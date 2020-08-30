import React, { useState, useEffect } from 'react';
import { Root, View, Panel, PanelHeader, Header, Group, Cell, CellButton } from '@vkontakte/vkui';
import bridge from "@vkontakte/vk-bridge";
import '@vkontakte/vkui/dist/vkui.css';

const App = () => {
	const [lat, setLat] = useState('');
	const [lng, setLng] = useState('');

	const [currentPage, setCurrentPage] = useState('main_page');

	useEffect(() => {
		bridge.send('VKWebAppGetGeodata').then(response => {
			setLat(response.lat);
			setLng(response.long);
		});

		bridge.send('VKWebAppGetAuthToken', { "app_id": 7581800, "scope": "friends,status" } ).then(response => {
			const { access_token, scope } = response;
			console.log('access_token', access_token);
			bridge.send('VKWebAppCallAPIMethod', { method: 'friends.getOnline', params: { access_token, v: '5.60' }})
				.then(response => {
					console.log('friends.getOnline: ', response);
				}).catch(console.log)

		}).catch(console.error)
	}, []);

	return (
		<Root activeView={currentPage}>
			<View activePanel="main_panel" id="main_page">
				<Panel id="main_panel">
					<PanelHeader>
						Основное
					</PanelHeader>
					<Group header={<Header mode="secondary">Мои Координаты</Header>}>
						<Cell>Широта: {lat}</Cell>
						<Cell>Долгота: {lng} </Cell>
					</Group>
					<CellButton onClick={() => setCurrentPage('settings_page')}>Открыть настройки</CellButton>
				</Panel>
			</View>
			<View id="settings_page" activePanel="main_panel2">
				<Panel id="main_panel2">
					<PanelHeader>
						Настройки
					</PanelHeader>
					<CellButton onClick={() => setCurrentPage('main_page')}>Вернуться</CellButton>
				</Panel>
			</View>
		</Root>
	)
}

export default App;

