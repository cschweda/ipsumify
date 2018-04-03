<template>
  <div>

    <v-container grid-list-md>
      <v-layout row wrap>
        <v-flex xs12 text-xs-right>

        </v-flex>
        <v-flex xs12 style="padding-left: 20px; padding-right: 20px">

          <div v-if="mode === 'markdown'">
            <pre class="clipboard">{{markdown}}</pre>
          </div>
          <div v-else-if="mode === 'html'">
            <pre class="clipboard">{{renderedMarkdown }}</pre>
          </div>
          <div v-else-if="mode === 'rendered'">
            <div v-html="renderedMarkdown" class="clipboard"></div>
          </div>
          <div v-else-if="mode === 'plain text'">
            <pre class="clipboard">{{rawText}}</pre>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
  import { EventBus } from '../event-bus.js';
  const loremIpsum = require('lorem-ipsum')
  const renderedMarkdown = require('markdown-it')();
  const markdownItAttrs = require('markdown-it-attrs');
  const markdownItNamedHeadings = require('markdown-it-named-headings');
  renderedMarkdown.use(markdownItAttrs);
  renderedMarkdown.use(markdownItNamedHeadings);

  import FontAwesomeIcon from '@fortawesome/vue-fontawesome'



  export default {
    name: 'HelloWorld',
    created() {
      this.pattern = this.defaultPattern;
      EventBus.$emit('set-pattern', this.pattern);

    },
    mounted() {

      this.generateIpsum(this.defaultPattern);
      EventBus.$on('regenerate', (pattern) => {
        this.generateIpsum(pattern);
        EventBus.$emit('regenerate-success');

      });

      EventBus.$on('reset-to-default-pattern', () => {
        this.pattern = this.defaultPattern;
        EventBus.$emit('set-pattern', this.pattern);
        EventBus.$emit('regenerate', this.pattern);

      });



      EventBus.$on('clipboard', () => {
        this.copyToClipboard();
        EventBus.$emit('clipboard-success');

      });
      EventBus.$on('display', (mode) => {
        this.mode = mode;
        EventBus.$emit('mode', mode);

      });
    },
    filters: {

    },

    computed: {

      renderedMarkdown: function () {
        return renderedMarkdown.render(this.markdown)
      },
      rawText: function () {
        return this.renderedMarkdown.replace(/(<([^>]+)>)/ig, "");
      }
    },
    methods: {
      generateIpsum(pattern) {
        console.log('Pattern: ', pattern)
        this.pattern = pattern
        this.parsePattern();


      },
      copyToClipboard() {
        console.log('Copy to clipboard');
        let textToCopy = '';

        if (this.mode != 'html-raw') {
          textToCopy = document.querySelector('.clipboard').innerHTML
        } else {
          textToCopy = renderedMarkdown.render(this.markdown);
        }
        //console.log(textToCopy)
        this.$copyText(textToCopy).then(function (e) {
        }, function (e) {

          console.log(e)
        })
      },
      generateParagraph(val) {
        let ub = parseInt(val);
        let lb = parseInt((val / 2));
        let ipsum = loremIpsum({
          count: 10, units: 'sentences', sentenceLowerBound: lb, sentenceUpperBound: ub
        });
        return `\r\n${ipsum}\r\n`;



      },
      generateHeading(lvl) {
        if (lvl < 0 || lvl > 6) {
          return
        }
        let ipsum = loremIpsum({
          count: 1
        });
        let heading = '';
        for (let i = 0; i < lvl; i++) {
          heading = heading + "#"
        }

        return `\r\n${heading} ${ipsum}\r\n`;

      },
      generateParagraphWithImage(pos) {
        let position;
        let ipsum1 = loremIpsum({
          count: 10, units: 'sentences', sentenceLowerBound: 5, sentenceUpperBound: 10
        });
        let ipsum2 = loremIpsum({
          count: 10, units: 'sentences', sentenceLowerBound: 15, sentenceUpperBound: 20
        });

        (pos === 'r') ? position = 'right' : position = 'left'

        return `\r\n${ipsum1}![My Image](https://via.placeholder.com/350x250){.float-${position}}${ipsum2}\r\n`


      },

      parsePattern: function () {

        let patternArray = this.pattern.split('-')
        let markdown = '';
        patternArray.forEach((el, idx) => {
          let element = el.charAt(0);
          let action = el.substr(1, el.length - 1);

          switch (element) {
            case 'p':
              markdown = markdown + this.generateParagraph(action);
              break;
            case 'i':
              markdown = markdown + this.generateParagraphWithImage(action);
              break;
            case 'h':
              markdown = markdown + this.generateHeading(action);
              break;
            default:
              break;
          }
        })
        this.markdown = markdown

      }
    },
    components: {
      FontAwesomeIcon
    },
    data() {
      return {
        markdown: '',
        defaultPattern: 'h1-p12-p14-p17-h2-p18-ir',
        pattern: '',
        mode: 'markdown'

      }
    }
  }
</script>


<style>
  pre {

    white-space: pre-wrap;
    /* css-3 */
    white-space: -moz-pre-wrap;
    /* Mozilla, since 1999 */
    white-space: -pre-wrap;
    /* Opera 4-6 */
    white-space: -o-pre-wrap;
    /* Opera 7 */
    word-wrap: break-word;
    /* Internet Explorer 5.5+ */
  }

  .float-right {
    float: right;
    padding-left: 10px;
    padding-top: 5px;
  }

  .float-left {
    float: left;
    padding-right: 10px;
    padding-top: 5px;
  }
</style>