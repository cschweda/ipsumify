<template>
  <v-app id="inspire" dark>
    <v-snackbar :timeout="timeout" :top="y === 'top'" :bottom="y === 'bottom'" :right="x === 'right'" :left="x === 'left'" :multi-line="mode === 'multi-line'"
      :vertical="mode === 'vertical'" v-model="snackbar" style="font-size: 20px; font-weight: 400; color: red; text-transform: uppercase;">
      {{snackbarText}}
      <!-- <v-btn flat color="pink" @click.native="snackbar = false">Close</v-btn> -->
    </v-snackbar>
    <v-navigation-drawer clipped fixed v-model="drawer" app>
      <v-container grid-list-md text-xs-center class="mt-3">
        <v-layout row wrap>
          <v-flex xs12 class="hidden-md-and-up">
            <v-btn color="error" @click.stop="emitRegenerateEvent" style="margin-right: 5px;" class="btn-display">Generate</v-btn>
            <v-btn color="info " @click="copyToClipboard ">
              <i class="fal fa-clipboard-check fa-2x "></i>
            </v-btn>
          </v-flex>
          <v-flex xs12 class="mt-1 pt-1">

            <v-btn color="info" @click="showText('markdown')" class="btn-display">Markdown</v-btn>
            <v-btn color="info" @click="showText('rendered')" class="btn-display">Rendered</v-btn>
            <v-btn color="info" @click="showText('html')" class="btn-display">HTML</v-btn>
            <v-btn color="info" @click="showText('plain text')" class="btn-display">Plain Text</v-btn>


          </v-flex>

          <v-flex xs12 style="border-top: 1px solid #aaa;" class="mt-4 pt-4">

            <v-btn color="info" @click="adjustLayout">Adjust Layout</v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </v-navigation-drawer>
    <v-toolbar app fixed clipped-left justify-center>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>

      <v-toolbar-title class="nav-title" @click.stop="emitRegenerateEvent ">
        ipsumify.me
      </v-toolbar-title>

      <v-spacer></v-spacer>
      <div class="mode">{{mode}}</div>
      <v-toolbar-items class=" hidden-sm-and-down ">

        <v-btn color="info " @click.stop="emitRegenerateEvent " style="margin-right: 5px; ">Generate</v-btn>
        <v-btn color="info " @click="copyToClipboard ">
          <i class="fal fa-clipboard-check fa-2x "></i>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <router-view></router-view>
    </v-content>

    <v-footer app fixed>
      <v-layout row wrap justify-center>
        <span>
          <a href="https://github.com/cschweda/ipsumify" class="github">
            <i class="fab fa-github"></i>
            Github</a>
        </span>
      </v-layout>
    </v-footer>
    <v-bottom-sheet v-model="sheet">
      <v-btn slot="activator" color="purple" dark>Click me</v-btn>
      <v-card>
        <v-container grid-list-md class="mt-3">
          <v-form v-on:submit.prevent="emitRegenerateEvent ">
            <v-text-field label="Layout Pattern" v-model="pattern" class="test"></v-text-field>
            <v-btn style="margin-left: -5px" @click.stop.prevent="emitRegenerateEvent ">
              Submit
            </v-btn>
            <v-btn @click.stop.prevent="emitResetToDefaultPatternEvent ">
              Reset
            </v-btn>

          </v-form>
        </v-container>
      </v-card>
    </v-bottom-sheet>
  </v-app>
</template>

<script>
  import { EventBus } from './event-bus.js';
  export default {
    data: () => ({
      drawer: true,
      textType: 'markdown',
      y: 'top',
      x: null,
      mode: '',
      snackbar: false,
      timeout: 1500,
      snackbarText: 'Hello',
      mode: 'Markdown',
      pattern: '',
      sheet: false,


    }),
    created() {
      EventBus.$on('set-pattern', (pattern) => {
        this.pattern = pattern;
        console.log('Pattern: ', this.pattern)
      });
      EventBus.$on('clipboard-success', () => {
        this.snackbarText = 'Copied to Clipboard'
        this.snackbar = true;
      });
      EventBus.$on('regenerate-success', () => {
        this.snackbarText = 'Lorum Ipsum Regenerated'
        this.snackbar = true;
      });
      EventBus.$on('mode', (mode) => {
        this.mode = mode;
      });

    },

    mounted() {



    },

    methods: {

      emitResetToDefaultPatternEvent: function () {
        this.sheet ?
          this.sheet = false : null

        EventBus.$emit('reset-to-default-pattern');
      },

      emitRegenerateEvent: function () {
        EventBus.$emit('regenerate', this.pattern);
        this.sheet ?
          this.sheet = false : null
      },

      adjustLayout: function () {
        this.sheet = true;
      },
      setPattern(val) {
        this.pattern = val;
      },
      copyToClipboard: function () {
        EventBus.$emit('clipboard');

      },
      showText: function (val) {
        EventBus.$emit('display', val);
        //console.log(val)
      }
    },
    props: {
      source: String
    }
  }
</script>


<style>
  body,
  pre {
    font-family: 'Roboto', sans-serif !important;
    color: #fff !important;
    font-size: 20px !important;
    font-weight: 400 !important;
  }

  footer {
    font-size: 14px;
  }

  .btn-display {
    width: 100px;
    font-size: 12px;
  }

  .big {
    font-size: 20px;
    font-weight: bold;

  }

  .nav-title {
    text-decoration: none !important;
    color: red !important;
    font-family: 'Special Elite', cursive !important;
    font-size: 44px !important;
  }

  .nav-title:hover {
    color: #aaa;
    cursor: pointer;
  }

  .mode {
    font-size: 12px;
    font-weight: 900;
    text-transform: uppercase;
    color: red;
    border: 1px dotted red;
    padding: 5px;
    margin-right: 20px;
  }

  .github {
    text-decoration: none !important;
    text-transform: uppercase;
  }

  .github:hover {
    color: #ccc;
  }
</style>