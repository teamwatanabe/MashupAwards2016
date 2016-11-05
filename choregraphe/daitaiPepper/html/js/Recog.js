/////////////////////////////////////////////
//	Pepperへのイベント発行関数
/////////////////////////////////////////////
function RaiseEvent(isPepper, eventName, msg){
	if( isPepper ){
		$.raiseALMemoryEvent(eventName, msg)
					.done(function (){})
					.fail(function (error){console.log("raiseEvent Error: " + error);});
	}
}

/////////////////////////////////////////////
//	変数
/////////////////////////////////////////////
$(function () {
	/////////////////////////////////////////////
	//	タッチイベントが利用可能かの判別
	/////////////////////////////////////////////
	var supportTouch = 'ontouchend' in document;
	var isPepper = true;

	/////////////////////////////////////////////
	//	ユーザエージェントでPepperか判定する
	/////////////////////////////////////////////
	var userAgent = navigator.userAgent.toLowerCase();
	if ( userAgent.indexOf('windows') != -1){
		isPepper = false;
	}

	/////////////////////////////////////////////
	//	イベント名
	/////////////////////////////////////////////
	var EVENTNAME_TOUCHSTART;
	if( supportTouch ){
		// タッチのサポートあり
		EVENTNAME_TOUCHSTART = 'touchstart';
	}else{
		// タッチのサポートなし
		EVENTNAME_TOUCHSTART = 'mousedown';
	}

	/////////////////////////////////////////////
	//	totabletイベントの監視を登録
	/////////////////////////////////////////////
	if( isPepper ){
			$.getService('ALMemory', function (memory) {
					memory.subscriber("PepperQiMessaging/RecogResult").done(function (subscriber) {
							subscriber.signal.connect(toTabletHandler);
					}).fail($.onQimError);
			}, $.onQimError);
	}

	/////////////////////////////////////////////
	//	Pepperからのメッセージハンドラ
	/////////////////////////////////////////////
        var gender
        var age
	function toTabletHandler(value) {
		element = value.split(',');
		// ID
		document.getElementById('Name').innerHTML = element[0];
		// Gender
                if( element[1] == "Male" ){
                       gender = "男性";
                }
                else if( element[1] == "Female" ){
                       gender = "女性";
                }
                else {
                       gender = "---";
                }
		document.getElementById('Gender').innerHTML = gender;//element[1];
		// Age ± AgeRange
                if( element[2] != "---" ){
                       age  = element[2] + " 才";
                }
                else {
                       age = element[2];
                }
		document.getElementById('Age').innerHTML = age;//element[2]+" 才";//+"±"+element[3];
		// DateRegist / DateHist
		document.getElementById('DateRegist').innerHTML = element[4];
		document.getElementById('DateHist1').innerHTML = element[6];//element[5];

	}

	/////////////////////////////////////////////
	//	イベントリスナー登録(touchstart取得)
	/////////////////////////////////////////////
	window.addEventListener('DOMContentLoaded', function(event){
		var el = document.getElementById('Button_Back');
		el.addEventListener(EVENTNAME_TOUCHSTART, function(event) {
			stopEvent(event);

			RaiseEvent(isPepper, 'PepperQiMessaging/PlaySE', "back");
			location.href = "index.html";
		}, false);
	});

	// 名前の登録
	window.addEventListener('DOMContentLoaded', function(event){
		var el = document.getElementById('Button_OK');
		el.addEventListener(EVENTNAME_TOUCHSTART, function(event) {
			stopEvent(event);

			message = document.getElementById("RegistName").value;

			// 画面の遷移を行う
			RaiseEvent(isPepper, 'PepperQiMessaging/RegistName',message);
		}, false);
	});

	/////////////////////////////////////////////
	//	イベントの停止
	/////////////////////////////////////////////
	var stopEvent = function(event) {
		event.preventDefault();
		event.stopPropagation();
	};
});
