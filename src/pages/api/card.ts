import type { APIRoute } from "astro"

export const GET: APIRoute = async ({ request }) => {
	try {
		// Получаем параметры из строки запроса
		const url = new URL(request.url)
		const message = url.searchParams.get("message")
		const userId = url.searchParams.get("userId")

		// Проверяем, что сообщение присутствует
		if (!message) {
			return new Response(JSON.stringify({ error: "Message is required" }), {
				status: 400,
				headers: {
					"Content-Type": "application/json",
					"Access-Control-Allow-Origin": "*", // Разрешаем все домены
				},
			})
		}

		// Логируем сообщение
		console.log("Добавление карточки с сообщением:", message)

		return new Response(
			JSON.stringify({ success: true, message: "Карточка добавлена!" }),
			{
				status: 200,
				headers: {
					"Content-Type": "application/json",
					"Access-Control-Allow-Origin": "*", // Разрешаем все домены
				},
			},
		)
	} catch (error) {
		console.error("Ошибка при добавлении карточки:", error)
		return new Response(JSON.stringify({ error: "Error adding card" }), {
			status: 500,
			headers: {
				"Content-Type": "application/json",
				"Access-Control-Allow-Origin": "*", // Разрешаем все домены
			},
		})
	}
}
