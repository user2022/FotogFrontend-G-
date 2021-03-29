<template>
    <div class="editor-cont">
        <div class="row-flex">
            <div>
                <editor-menu-bar :editor="editor" v-slot="{commands, isActive}">
                    <div class="menubar">
                        <!-- Bold -->
                        <button class="menu-btn" :class="{ 'is-active': isActive.bold()}" @click="commands.bold">
                            <i class="fas fa-bold"></i>
                        </button>
                        <!-- Italic -->
                        <button class="menu-btn" :class="{ 'is-active': isActive.italic()}" @click="commands.italic">
                            <i class="fas fa-italic"></i>
                        </button>
                        <!-- Strike -->
                        <button class="menu-btn" :class="{ 'is-active': isActive.strike()}" @click="commands.strike">
                            <i class="fas fa-strikethrough"></i>
                        </button>
                        <!-- Underline -->
                        <button class="menu-btn" :class="{ 'is-active': isActive.underline()}" @click="commands.underline">
                            <i class="fas fa-underline"></i>
                        </button>
                        <!-- Code -->
                        <button class="menu-btn" :class="{ 'is-active': isActive.code()}" @click="commands.code">
                            <i class="fas fa-code"></i>
                        </button>

                        <!-- Paragraph -->
                        <button class="menu-btn" :class="{ 'is-active': isActive.paragraph()}" @click="commands.paragraph">
                            <i class="fas fa-paragraph"></i>
                        </button>
                        <!-- Heading -->
                        <button class="menu-btn" :class="{ 'is-active': isActive.heading({level:1})}" @click="commands.heading({level:1})">
                            <i class="far fa-h1"></i>
                        </button>
                        <button class="menu-btn" :class="{ 'is-active': isActive.heading({level:2})}" @click="commands.heading({level:2})">
                            <i class="fas fa-h2"></i>
                        </button>
                        <button class="menu-btn" :class="{ 'is-active': isActive.heading({level:3})}" @click="commands.heading({level:3})">
                            <i class="far fa-h3"></i>
                        </button>
                        <button class="menu-btn" :class="{ 'is-active': isActive.heading({level:4})}" @click="commands.heading({level:4})">
                            <i class="far fa-h4"></i>
                        </button>

                        <!-- Bullet List -->
                        <button class="menu-btn" :class="{ 'is-active': isActive.bullet_list()}" @click="commands.bullet_list">
                            <i class="fas fa-list"></i>
                        </button>
                        <!-- Ordered List -->
                        <button class="menu-btn" :class="{ 'is-active': isActive.ordered_list()}" @click="commands.ordered_list">
                            <i class="fas fa-list-ol"></i>
                        </button>

                        <!-- Block Quote -->
                        <button class="menu-btn" :class="{ 'is-active': isActive.blockquote()}" @click="commands.blockquote">
                            <i class="fas fa-quote-right"></i>
                        </button>
                        <!-- Code Block -->
                        <button class="menu-btn" :class="{ 'is-active': isActive.code_block()}" @click="commands.code_block">
                            <i class="fas fa-brackets-curly"></i>
                        </button>
                        <!-- Table -->
                        <button class="menu-btn" @click="commands.createTable({rowsCount: 3, colsCount: 3, withHeaderRow: false})">
                            <i class="fas fa-table"></i>
                        </button>

                        <span v-if="isActive.table()" class="xd">
                    <button class="menu-btn" @click="commands.deleteTable">
                        <i class="fas fa-trash"></i>
                    </button>

                    <button class="menu-btn" @click="commands.addColumnBefore">
                        <i class="fas fa-table"></i>
                    </button>

                    <button class="menu-btn" @click="commands.addColumnAfter">
                        <i class="fas fa-table"></i>
                    </button>

                    <button class="menu-btn" @click="commands.deleteColumn()">
                        <i class="fas fa-table"></i>
                    </button>

                    <button class="menu-btn" @click="commands.addRowBefore">
                        <i class="fas fa-table"></i>
                    </button>

                    <button class="menu-btn" @click="commands.addRowAfter">
                        <i class="fas fa-table"></i>
                    </button>

                    <button class="menu-btn" @click="commands.deleteRow">
                        <i class="fas fa-table"></i>
                    </button>

                    <button class="menu-btn" @click="commands.toggleCellMerge()">
                        <i class="fas fa-table"></i>
                    </button>
                </span>

                    </div>
                </editor-menu-bar>

                <editor-content :editor="editor" v-model="content"></editor-content>
            </div>
        </div>

<!--        <div class="sub-cont">-->
<!--            <button class="my-btn my-btn-primary">Submit</button>-->

<!--            <div v-html="content">-->

<!--            </div>-->



<!--        </div>-->
    </div>
</template>

<script>
import {Editor, EditorContent, EditorMenuBar} from 'tiptap';
import {
    Blockquote,
    CodeBlock,
    HardBreak,
    Heading,
    HorizontalRule,
    OrderedList,
    BulletList,
    ListItem,
    TodoItem,
    TodoList,
    Bold,
    Code,
    Italic,
    Link,
    Strike,
    Underline,
    History,
    Table,
    TableHeader,
    TableCell,
    TableRow,
} from 'tiptap-extensions'

export default {
    name: "forum-editor",
    components: {EditorContent, EditorMenuBar},
    data() {
        return {
            editor: null,
            rows: 1,
            cols: 1,
            showTable: false,
            content: ''
        }
    },
    mounted() {
        this.editor = new Editor({
            extensions: [
                new Blockquote(),
                new BulletList(),
                new CodeBlock(),
                new HardBreak(),
                new Heading({ levels: [1, 2, 3] }),
                new HorizontalRule(),
                new ListItem(),
                new OrderedList(),
                new TodoItem(),
                new TodoList(),
                new Link(),
                new Bold(),
                new Code(),
                new Italic(),
                new Strike(),
                new Underline(),
                new History(),
                new Table({resizable: true}),
                new TableHeader(),
                new TableCell(),
                new TableRow(),
            ],
            onUpdate: ({ getHTML }) => {
                // get new content on update
                this.content = getHTML();
                this.sendData();
            },
        });
    },
    methods: {
        sendData() {
            this.$emit('get-data', this.content)
        }
    },
    beforeDestroy() {
        this.editor.destroy();
    }
}
</script>

<style scoped>
    .row-flex {
        display: flex;
        flex-direction: row;
        width: 100%;
    }

    .row-flex div {
        width: 100%;
    }


    .editor-cont {
        width: 100%;
    }

    .menu-btn {
        padding: 1px 9px;
        border-radius: 3px;
        margin: 6px .2rem 6px 0 ;
    }

    .line-break {
        height: 40px;
        border-left: 1px solid #cfd1dd;
        margin: 0 .2rem;
    }

    .menu-btn:first-child {
        margin-left: .2rem;
    }

    .menu-btn:hover {
        background-color: #eaeaea;
    }

    .is-active {
        background-color: #d6d6d6;
    }

    .is-active:hover {
        background-color: #d6d6d6;
    }

    .menubar {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-items: center;
        border: 1px solid #cfd1dd;
        background-color: #f5f5f5;
    }

    .arrow-right {
        margin-left: .1rem;
    }

    /* Drop sec */

    .xd {
        background-color: #81a8b0;
    }

</style>
