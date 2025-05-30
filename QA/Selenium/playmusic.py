from selenium import webdriver
from selenium.webdriver.common.by import By
import time

# Configurar el driver de Chrome
driver = webdriver.Chrome()

try:
    # Abrir la página del perfil del músico
    driver.get("https://ftg-ecos.netlify.app/profile/musician/40")
    print("Página del perfil de músico abierta correctamente.")

    # Hacer clic en el elemento con selector CSS 'polygon'
    driver.find_element(By.CSS_SELECTOR, "polygon").click()
    print("Elemento 'polygon' clickeado.")

    # Hacer clic en el elemento con selector CSS 'svg.stroke-ecos-blue.fill-ecos-blue.size-4 > rect'
    driver.find_element(By.CSS_SELECTOR, "svg.stroke-ecos-blue.fill-ecos-blue.size-4 > rect").click()
    print("Elemento 'rect' dentro de SVG clickeado.")

    # Esperar unos segundos para verificar el resultado
    time.sleep(3)

    # Validar si la prueba pasó o falló
    mensaje_error = driver.find_elements(By.CLASS_NAME, "error-message")  

    if mensaje_error:
        print("Prueba fallida: Se mostraron errores de validación. ❌")
    else:
        print("Prueba exitosa: La acción se completó correctamente. ✅🎧")

except Exception as e:
    print(f"Error en la ejecución de la prueba: {e}")

finally:
    # Cerrar navegador
    driver.quit()
    print("Prueba finalizada. Navegador cerrado.")