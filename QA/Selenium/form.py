from selenium import webdriver
from selenium.webdriver.common.by import By
import time

# Configurar el driver de Chrome
driver = webdriver.Chrome()

try:
    # Abrir la página del perfil del músico
    driver.get("https://ftg-ecos.netlify.app/profile/musician/40")
    print("Página del perfil de músico abierta correctamente.")

    # Introducir datos indicado por el equipo de desarrollo en los campos del formulario
    driver.find_element(By.ID, "name").click()
    driver.find_element(By.ID, "name").send_keys("brenda tanoni")
    print("Nombre ingresado.")

    driver.find_element(By.ID, "senderEmail").click()
    driver.find_element(By.ID, "senderEmail").send_keys("brendayohenatanoni@gmail.com")
    print("Correo electrónico ingresado.")

    driver.find_element(By.ID, "message").send_keys("mensaje de prueba automática")
    print("Mensaje ingresado.")

    # Enviar el formulario
    driver.find_element(By.XPATH, "//button[@type='submit']").click()
    print("Formulario enviado.")

    # Esperar unos segundos para verificar el resultado
    time.sleep(3)

    # Validar si la prueba pasó o falló
    mensaje_error = driver.find_elements(By.CLASS_NAME, "error-message")  

    if mensaje_error:
        print("Prueba fallida: Se mostraron errores de validación. ❌")
    else:
        print("Prueba exitosa: El formulario se envió correctamente. ✅ 📧")

except Exception as e:
    print(f"Error en la ejecución de la prueba: {e}")

finally:
    # Cerrar navegador
    driver.quit()
    print("Prueba finalizada. Navegador cerrado.")