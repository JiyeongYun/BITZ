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
@RequestMapping("/account/user")
@Api("Account 컨트롤러 API V1")
@Slf4j
public class UserAuthController {

    private UserAuthService userAuthService;

    @PostMapping("/userauth")
    @ApiOperation(value = "회원가입", notes = "회원의 정보를 DB에 저장합니다.")
    public ResponseEntity<UserAuthResponse> createUser(@RequestBody @ApiParam(value = "회원 정보") UserAuthRequest userAuthRequest) throws Exception {
        UserAuthResponse response = new UserAuthResponse(userAuthService.createUser(userAuthRequest));
        return new ResponseEntity<UserAuthResponse>(response, HttpStatus.OK);
    }

    @PostMapping("/userauth/email")
    @ApiOperation(value = "이메일 중복체크", notes = "이메일 중복체크를 시행합니다.")
    public ResponseEntity<UserAuthResponse> checkDuplicatedEmail(@RequestBody @ApiParam(value = "회원 정보") UserAuthRequest userAuthRequest) throws Exception {
        return null;
    }

    @PostMapping("/userauth/nickname")
    @ApiOperation(value = "닉네임 중복체크", notes = "닉네임 중복체크를 시행합니다.")
    public ResponseEntity<UserAuthResponse> checkDuplicatedNickname(@RequestBody @ApiParam(value = "회원 정보") UserAuthRequest userAuthRequest) throws Exception {
        return null;
    }

    @PostMapping("/userauth/login")
    @ApiOperation(value = "로그인", notes = "회원의 정보를 통해 로그인 처리를 합니다.")
    public ResponseEntity<UserAuthResponse> readUser(@RequestBody @ApiParam(value = "회원 정보") ReadAuthRequest readAuthRequest) throws Exception {
        UserAuthResponse response = new UserAuthResponse(userAuthService.readUser(readAuthRequest));
        if (response == null) // 일치하는 회원 정보 없음
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
//            return new ResponseEntity<UserAuthResponse>(response, HttpStatus.BAD_REQUEST);
        String accessToken = userAuthService.createToken(userAuthService.getUserAuthByEmail(readAuthRequest.getEmail()));
        response.setAccesstoken(accessToken);
        return new ResponseEntity<UserAuthResponse>(response, HttpStatus.OK);
    }

    @PostMapping("/loginlog")
    @ApiOperation(value = "최초 로그인 확인", notes = "회원의 최초 로그인 여부를 DB에서 확인합니다.")
    public ResponseEntity<UserAuthResponse> readLoginLog(@RequestBody @ApiParam(value = "회원 정보") ReadAuthRequest readUAuthRequest) throws Exception {
        return null;
    }

    @PostMapping("/userprofile")
    @ApiOperation(value = "마이페이지 정보 저장", notes = "회원의 마이페이지 정보를 저장합니다.")
    public ResponseEntity<UserAuthResponse> createProfile(@RequestBody @ApiParam(value = "회원 정보") ReadAuthRequest readUAuthRequest) throws Exception {
        return null;
    }

    @GetMapping("/userprofile")
    @ApiOperation(value = "마이페이지 정보 조회", notes = "회원의 마이페이지 정보를 조회합니다.")
    public ResponseEntity<UserAuthResponse> readProfile(@RequestBody @ApiParam(value = "회원 정보") ReadAuthRequest readUAuthRequest) throws Exception {
        return null;
    }

    @PutMapping("/userprofile")
    @ApiOperation(value = "마이페이지 정보 수정", notes = "회원의 마이페이지 정보를 수정합니다.")
    public ResponseEntity<UserAuthResponse> updateProfile(@RequestBody @ApiParam(value = "회원 정보") ReadAuthRequest readUAuthRequest) throws Exception {
        return null;
    }

    @PutMapping("/userauth/password/change")
    @ApiOperation(value = "비밀번호 변경", notes = "회원의 비밀번호를 DB에서 수정합니다.")
    public ResponseEntity<UserAuthResponse> updatePassword(@RequestBody @ApiParam(value = "회원 정보") UpdatePasswordRequest updatePasswordRequest) throws Exception {
        UserAuthResponse response = new UserAuthResponse(userAuthService.updatePassword(updatePasswordRequest));
        if (response == null) //기존의 입력한 비밀번호가 일치하지 않음
            return new ResponseEntity<UserAuthResponse>(response, HttpStatus.BAD_REQUEST);
        return new ResponseEntity<UserAuthResponse>(response, HttpStatus.OK);
    }

    @PutMapping("/userauth/password/reset")
    @ApiOperation(value = "비밀번호 찾기", notes = "회원의 이메일에 비밀번호를 찾아서 임시 비밀번호를 이메일로 전송합니다.")
    public ResponseEntity<UserAuthResponse> resetPassword(@RequestBody @ApiParam(value = "비밀번호 찾기") UserAuthRequest userAuthRequest) throws Exception {
        UserAuthResponse response = new UserAuthResponse(userAuthService.resetPassword(userAuthRequest));
        return new ResponseEntity<UserAuthResponse>(response, HttpStatus.OK);
    }

    @DeleteMapping("/userauth")
    @ApiOperation(value = "회원탈퇴", notes = "회원의 계정을 DB에서 삭제합니다.")
    public ResponseEntity deleteUser(@RequestBody @ApiParam(value = "회원탈퇴") ReadAuthRequest readAuthRequest) throws Exception {
        userAuthService.deleteUser(readAuthRequest);
        return new ResponseEntity(HttpStatus.OK);
    }

}
