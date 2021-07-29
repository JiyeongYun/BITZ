package com.osds.bitz.controller.account.user;

import com.osds.bitz.model.network.request.ReadAuthRequest;
import com.osds.bitz.model.network.request.UpdatePasswordRequest;
import com.osds.bitz.model.network.request.UserAuthRequest;
import com.osds.bitz.model.network.response.UserAuthResponse;
import com.osds.bitz.service.account.user.UserAuthService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/account")
@Api("Account 컨트롤러 API V1")
@Slf4j
public class UserAuthController {

    private UserAuthService userAuthService;

    @PostMapping("/createuser")
    @ApiOperation(value = "회원가입", notes = "회원의 정보를 DB에 저장합니다.")
    public ResponseEntity<UserAuthResponse> createUser(@RequestBody @ApiParam(value = "회원 정보") UserAuthRequest userAuthRequest) throws Exception {
        UserAuthResponse response = new UserAuthResponse(userAuthService.createUser(userAuthRequest));
        if (response == null) // 이미 존재하는 이메일이다.
            return new ResponseEntity<UserAuthResponse>(response, HttpStatus.BAD_REQUEST);
        return new ResponseEntity<UserAuthResponse>(response, HttpStatus.OK);
    }

    @PostMapping("/readuserauth")
    @ApiOperation(value = "로그인", notes = "회원의 정보를 통해 로그인 처리를 합니다.")
    public ResponseEntity<UserAuthResponse> readUserAuth(@RequestBody @ApiParam(value = "회원 정보") ReadAuthRequest readAuthRequest) throws Exception {
        UserAuthResponse response = new UserAuthResponse(userAuthService.readUser(readAuthRequest));
        if (response == null) // 일치하는 회원 정보 없음
            return new ResponseEntity<UserAuthResponse>(response, HttpStatus.BAD_REQUEST);
        return new ResponseEntity<UserAuthResponse>(response, HttpStatus.OK);
    }

        @PostMapping("/readfirstuserauth")
        @ApiOperation(value = "첫 로그인인지 확인", notes = "회원이 처음으로 로그인했는지 DB에서 확인합니다.")
        public ResponseEntity<UserAuthResponse> readFirstUserAuth(@RequestBody @ApiParam(value = "회원 정보") ReadAuthRequest readUAuthRequest) throws Exception {
            UserAuthResponse response = new UserAuthResponse(userAuthService.readFirstUserAuthRequest(readUAuthRequest));
            if (response == null) //최초 로그인이 아닙니다.
                return new ResponseEntity<UserAuthResponse>(response, HttpStatus.BAD_REQUEST);
            return new ResponseEntity<UserAuthResponse>(response, HttpStatus.OK);
    }

    @PutMapping("/updatepassword")
    @ApiOperation(value = "비밀번호 변경", notes = "회원의 비밀번호를 DB에서 수정합니다.")
    public ResponseEntity<UserAuthResponse> updatePassword(@RequestBody @ApiParam(value = "회원 정보") UpdatePasswordRequest updatePasswordRequest) throws Exception {
        UserAuthResponse response = new UserAuthResponse(userAuthService.updatePassword(updatePasswordRequest));
        return new ResponseEntity<UserAuthResponse>(response, HttpStatus.OK);
    }

    @PutMapping("/readpassword")
    @ApiOperation(value = "비밀번호 찾기", notes = "회원의 이메일에 비밀번호를 찾아서 임시 비밀번호를 이메일로 전송합니다.")
    public ResponseEntity<UserAuthResponse> readPassword(@RequestBody @ApiParam(value = " 비밀번호 찾기") UserAuthRequest userAuthRequest) throws Exception {
        UserAuthResponse response = new UserAuthResponse(userAuthService.readPassword(userAuthRequest));
        return new ResponseEntity<UserAuthResponse>(response, HttpStatus.OK);
    }


}
