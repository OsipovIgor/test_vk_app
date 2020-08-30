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
		})
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

