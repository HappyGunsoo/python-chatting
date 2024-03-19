const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

// Variable ------------------

// Event ---------------------
function setBtnEvt() {
    $$('nav > .tab-list > li').forEach((x) => {
        x.addEventListener('click', function () {
            this.parentNode.querySelectorAll('li').forEach((y) => y.classList.remove('on'));
            this.classList.add('on');
            let targetTab = this.dataset.targetTab;
            $$('.tab-item').forEach((y) => y.classList.add('blind'));
            $(`.tab-item[data-tab-name=${targetTab}]`).classList.remove('blind');
        });
    });

    $('.tab-body').addEventListener('click', function (e) {
        if (e.target && e.target.classList.contains('profile-picture')) {
            let el = e.target;
            let offset = el.getBoundingClientRect();
            let userDetailCard = $('.user-detail-card');
            let standardEl = $('html');
            let standardScrollTop = standardEl.scrollTop;
            let limitTop = window.innerHeight - userDetailCard.clientHeight;
            let top = Math.max(0, Math.min(limitTop, offset.top + (standardScrollTop - standardEl.scrollTop)));
            userDetailCard.style.top = top + 'px';
            userDetailCard.style.left = offset.left + offset.width + 10 + 'px';
            userDetailCard.style.transform = 'scale(1)';

            function closeUserDetailCard() {
                userDetailCard.style.transform = 'scale(0)';
                document.removeEventListener('click', onClickOutside, true);
                document.removeEventListener('scroll', onScroll, true);
            }

            function onClickOutside(e) {
                console.log(e.target)
                if(e.target.closest('.btn-new-chat')) closeUserDetailCard();
                if(!e.target.closest('.user-detail-card')) closeUserDetailCard();
            }

            function onScroll() {
                let top = Math.max(0, Math.min(limitTop, offset.top + (standardScrollTop - standardEl.scrollTop)));
                let _offset = el.getBoundingClientRect();
                let isHide = _offset.top + el.clientHeight < 0 || _offset.top > window.innerHeight;
                userDetailCard.style.top = top + 'px';
                if (isHide) closeUserDetailCard();
            }
            
            document.addEventListener('click', onClickOutside, true);
            document.addEventListener('scroll', onScroll, true);
        }
    });

    $$('.btn-arrow').forEach(x => {
        x.addEventListener('click', function() {
            this.classList.toggle('open')
            $(`.${this.dataset.slideTarget}`).classList.toggle('open')
        })
    })

    $('.chatting-room-container .btn-close').addEventListener('click', function() {
        this.closest('.chatting-room-container').classList.remove('open')
    })

    $('.user-detail-card .btn-new-chat').addEventListener('click', function() {
        const chattingRoomContainerEl = $('.chatting-room-container')
        const chattingRoomBodyEl = chattingRoomContainerEl.querySelector('.chatting-room-body')
        chattingRoomContainerEl.classList.add('open')
        chattingRoomBodyEl.scrollTop = chattingRoomBodyEl.scrollHeight
        
    })
}
function setOnScroll() {}

// Function ------------------
function addUserRow() {
    let html = `
        <div class="row-user">
            <div class="profile-picture" style='background-image: url(./public/img/jobs.jpg)'>
            </div>
            <div class="user-info">
                <div class="nickname">Steven Paul Jobs</div>
                <div class="desc">I Love IPhone Mini 😎</div>
            </div>
        </div>`;
    $('.friend-list').insertAdjacentHTML('beforeEnd', html);
}
// Init ----------------------
function init() {
    setBtnEvt();

    for (let i = 0; i < 100; i++) {
        addUserRow();
    }

    $('.tab-list li:nth-child(2)').click();
}

init();
