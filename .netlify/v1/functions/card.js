// netlify/functions/card.js
exports.handler = async function (event, context) {
	if (event.httpMethod === "POST") {
		try {
			const { message, userId } = JSON.parse(event.body)
			console.log("Получено сообщение:", message, "от пользователя:", userId)

			// Логика для добавления карточки или другой обработки данных

			return {
				statusCode: 200,
				body: JSON.stringify({ success: true, message: "Карточка добавлена!" }),
			}
		} catch (error) {
			return {
				statusCode: 500,
				body: JSON.stringify({ error: "Ошибка при добавлении карточки" }),
			}
		}
	} else {
		return {
			statusCode: 404,
			body: JSON.stringify({ error: "Not Found" }),
		}
	}
}
