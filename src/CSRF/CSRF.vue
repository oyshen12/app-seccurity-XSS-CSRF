<script setup lang="ts">
import Sandbox from './Sandbox.vue';
import { ref } from 'vue';
import CommonBtn from '../components/CommonBtn.vue';
import { iframeCSRF, imageCSRF, simpleCSRF } from './examples.ts';

const typeCSRF = ref<'simple' | 'image' | 'iframe'>('simple');
const sandboxVisible = ref(false);
const sandboxVisibleHandler = (): void => {
  sandboxVisible.value = !sandboxVisible.value;
};
</script>

<template>
  <div class="csrf">
    <div class="csrf__paragraph">
      <span class="csrf__paragraph--bold">CSRF (cross-site request forgery, подделка межсайтовых запросов)</span> — вид
      атак на сайт, при которой злоумышленник с помощью мошеннического сайта или скрипта заставляет браузер пользователя
      выполнять на доверенном сайте действия от его имени: отправлять сообщения, менять пароли, переводить деньги со
      счета на счет и пр.
    </div>
    <div class="csrf__paragraph csrf__paragraph--bold">Виды CSRF атак:</div>
    <div class="csrf__types">
      <CommonBtn :active="typeCSRF === 'simple'" class="xss_types-btn" @click="typeCSRF = 'simple'"
        >Простая CSRF атака</CommonBtn
      >
      <CommonBtn :active="typeCSRF === 'image'" class="xss_types-btn" @click="typeCSRF = 'image'"
        >CSRF через изображения</CommonBtn
      >
      <CommonBtn :active="typeCSRF === 'iframe'" class="xss_types-btn" @click="typeCSRF = 'iframe'"
        >CSRF через фреймы</CommonBtn
      >
    </div>
    <div class="csrf__description">
      <div v-if="typeCSRF === 'simple'" class="csrf__description-text">
        <div class="csrf__description-paragraph">Это наиболее распространенный вид CSRF атаки.</div>
        <div class="csrf__description-paragraph">Как это работает?</div>
        <ul>
          <li>Атакующий создает форму на своем сайте, которая отправляет POST-запрос на целевой сайт.</li>
          <li>
            Когда пользователь открывает форму на сайте атакующего и отправляет ее, браузер пользователя автоматически
            отправляет куки целевого сайта вместе с запросом.
          </li>
        </ul>
        <div v-html="simpleCSRF" />
      </div>
      <div v-if="typeCSRF === 'image'" class="csrf__description-text">
        <div class="csrf__description-paragraph">
          Злоумышленники могут использовать изображения с ссылками, которые отправляют запросы на целевой сайт.
        </div>
        <div v-html="imageCSRF" />
      </div>
      <div v-if="typeCSRF === 'iframe'" class="csrf__description-text">
        <div class="csrf__description-paragraph">
          Эта атака использует iframe для выполнения действий на целевом сайте.
        </div>
        <div v-html="iframeCSRF" />
      </div>
      <div class="csrf__paragraph csrf__paragraph--bold">Как защититься?</div>
      <ul>
        <li>
          <strong>SOP</strong> (same-origin policy, политика одинакового источника) определяет то, как именно скрипт или
          документ, который загружен из оригинального источника (origin), будет взаимодействовать с ресурсом,
          загруженным из другого источника. Две страницы имеют одинаковый источник, если у них совпадают хост (host),
          порт (port) и протокол (http или https). Часто можно встретить также запись вида scheme/host/port tuple. Это
          позволяет изолировать документы, которые могут нанести вред, и снизить количество вероятных векторов атак.
        </li>
        <li>
          <strong>Токены CSRF.</strong> CSRF-токены (или anti-CSRF-токены) напоминают cookies. Это такие же данные,
          которые сервер отправляет браузеру в ожидании получить их обратно, но отличие в следующем: сервер должен
          отправить браузеру уникальный токен и проверить, присылает ли его браузер в ответ в запросе. Если токены
          совпадают, запрос действителен, если нет — отклоняется.
        </li>
        <li>
          <strong>Флаг Same-Site Cookies.</strong> Метод похож на использование SOP. Отличие в том, что флаг Same-Site
          помечает куки для одного доменного имени. В результате источник запроса подвергается проверке. Считается, что
          cookies и источник запроса имеют одинаковое происхождение, если протокол, порт (если применимо) и хост (но не
          IP-адрес) одинаковы для обоих. Таким образом не получится отправить запрос с мошеннического сайта. Флаг
          поддерживает подавляющее большинство современных браузеров, и его использование является хорошей практикой в
          стратегии защиты.
        </li>
        <li>
          <strong>Подтверждение действий от пользователя.</strong> Для отправки денежных средств, изменения
          аутентификационных данных и т.д. хорошая практика — дополнительное подтверждающее действие. Например, после
          попытки смены пароля можно попросить пользователя нажать на кнопку на сайте или ввести капчу. Это является еще
          одной отправкой запроса. Вместе с вышеупомянутыми методами это обеспечивает надежную защиту сайта и
          веб-приложения.
        </li>
      </ul>
    </div>
    <CommonBtn class="csrf__sandbox" @click="sandboxVisibleHandler">Показывать Sandbox: {{ sandboxVisible }}</CommonBtn>
    <Sandbox v-if="sandboxVisible" />
  </div>
</template>

<style scoped lang="scss">
.csrf__paragraph {
  max-width: 1000px;
  font-size: 24px;
  margin-top: 32px;

  &--bold {
    font-weight: 800;
  }
}

.csrf__sandbox {
  margin-top: 32px;
}

.csrf__types {
  margin-top: 16px;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.csrf__description-text {
  max-width: 1000px;
  font-size: 24px;
  margin-top: 16px;
}

.csrf__description-paragraph {
  margin-top: 12px;
}

.csrf__description-text-title {
  font-weight: 800;
}

li {
  font-size: 24px;
  margin-bottom: 8px;
}
</style>
