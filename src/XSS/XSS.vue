<script setup lang="ts">
import { ref } from 'vue';
import CommonBtn from '../components/CommonBtn.vue';
import Sandbox from './Sandbox.vue';

const typeXSS = ref<'dom' | 'reflected' | 'stored'>('stored');
const sandboxVisible = ref(false);
const sandboxVisibleHandler = (): void => {
  sandboxVisible.value = !sandboxVisible.value;
};
</script>

<template>
  <div class="xss">
    <div class="xss__paragraph">
      <span class="xss__paragraph--bold">XSS (Cross‑site scripting)</span> — это тип уязвимости, встречающийся в web
      приложениях. XSS атаки позволяют внедрить вредоносный скрипт (или как его еще часто называют эксплойт) на страницу
      приложения, в результате чего у пользователей, посещающих эту страницу, могут украсть данные разной степени
      чувствительности: куки, сессионные токены, логины с паролями и просто личную информацию о пользователе.
    </div>
    <div class="xss__paragraph xss__paragraph--bold">Виды XSS атак:</div>
    <div class="xss__types">
      <CommonBtn :active="typeXSS === 'stored'" class="xss_types-btn" @click="typeXSS = 'stored'">Хранимые</CommonBtn>
      <CommonBtn :active="typeXSS === 'reflected'" class="xss_types-btn" @click="typeXSS = 'reflected'"
        >Отраженные</CommonBtn
      >
      <CommonBtn :active="typeXSS === 'dom'" class="xss_types-btn" @click="typeXSS = 'dom'">DOM-модель</CommonBtn>
    </div>
    <div class="xss__description">
      <div v-if="typeXSS === 'stored'" class="xss__description-text">
        <span class="xss__description-text-title">Хранимые (постоянные)</span>. Такие уязвимости возникают, когда
        злоумышленнику удается получить доступ к серверу и сохранить на нем вредоносный код. Такой сохраненный скрипт
        будет активироваться каждый раз, когда пользователь заходит на зараженную страницу. Часто хранимые
        XSS-уязвимости можно найти на различных форумах, а также в соцсетях, имиджбордах, блогах и т.д. Для их внедрения
        на ресурс злоумышленники могут использовать обычный текст (например, в виде комментариев), рисунки, гифки и
        другой размещаемый контент.
      </div>
      <div v-if="typeXSS === 'reflected'" class="xss__description-text">
        <span class="xss__description-text-title">Отраженные (непостоянные).</span> Это наиболее распространенный
        сегодня тип XSS-атак. Их смысл в том, что злоумышленник прячет вредоносный код в заранее подготовленной ссылке,
        которую потом передает пользователям-жертвам в почтовой рассылке или размещает на веб-странице. Когда
        пользователь переходит по зараженной ссылке, серверные скрипты исполняют ее код без обработки и возвращают его в
        виде ответа. Браузер пользователя исполняет зараженный скрипт, а злоумышленник получает cookies жертвы.
      </div>
      <div v-if="typeXSS === 'dom'" class="xss__description-text">
        <span class="xss__description-text-title">DOM-модель.</span> Суть этой уязвимости — в использовании
        злоумышленником Document Object Model, объектной модели документа. Это программный интерфейс, дающий программам
        и сценариям доступ к контенту HTML-, XHTML- и XML-документов и возможность этим содержанием (а также структурой
        и оформлением) управлять. XSS-уязвимости на основе DOM-модели могут быть как отраженными, так и хранимыми. Их
        главная особенность — сама страница сайта или веб-приложения не меняется, но меняется ее отображение в браузере
        пользователя из-за вредоносных модификаций DOM.
      </div>
    </div>
    <div class="xss__paragraph xss__paragraph--bold">Как защититься?</div>
    <ul>
      <li>Поместить потециально опасный код внутрь iframe;</li>
      <li>
        Настроить фильтрацию и экранизацию входных параметров, то есть информации, вводимой пользователем через
        интерактивные поля и формы;
      </li>
      <li>
        Настроить автоматическую замену спецсимволов, чтобы четко отделить пользовательский текст от исполняемого кода;
      </li>
      <li>Установить ограничения домена и путей приема cookie-файлов с помощью SSL или параметра HttpOnly;</li>
      <li>Задать список желательных источников для загрузки контента с помощью заголовка Content Security Policy;</li>
    </ul>
    <div class="xss__examples xss__paragraph xss__paragraph--bold">
      <div>Примеры XSS атак:</div>
      <a
        href="https://cheatsheetseries.owasp.org/cheatsheets/XSS_Filter_Evasion_Cheat_Sheet.html"
        target="_blank"
        class="xss__examples-link"
        >ссылка</a
      >
    </div>
    <CommonBtn class="xss__sandbox" @click="sandboxVisibleHandler">Показывать Sandbox: {{ sandboxVisible }}</CommonBtn>
    <Sandbox v-if="sandboxVisible" />
  </div>
</template>

<style scoped lang="scss">
.xss__paragraph {
  max-width: 1000px;
  font-size: 24px;
  margin-top: 32px;

  &--bold {
    font-weight: 800;
  }
}

.xss__types {
  margin-top: 16px;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.xss__description-text {
  max-width: 1000px;
  font-size: 24px;
  margin-top: 16px;
}

.xss__description-text-title {
  font-weight: 800;
}

.xss__examples {
  display: flex;
}

.xss__examples-link {
  margin-left: 8px;
}

.xss__sandbox {
  margin-top: 32px;
}

li {
  font-size: 24px;
  margin-bottom: 8px;
}
</style>
